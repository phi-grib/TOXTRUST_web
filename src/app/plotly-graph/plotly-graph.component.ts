import { Component, OnInit, inject } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';
import { MatIconModule } from '@angular/material/icon';
PlotlyModule.plotlyjs = PlotlyJS;
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ResultevidenceComponent } from '../resultevidence/resultevidence.component';
import { CapitalizePipe } from "../capitalize.pipe";

@Component({
  selector: 'app-plotly-graph',
  standalone: true,
  imports: [MatIconModule, CommonModule, PlotlyModule, MatButtonModule, CapitalizePipe],
  templateUrl: './plotly-graph.component.html',
  styleUrl: './plotly-graph.component.scss'
})

export class PlotlyGraphComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(private flaskSerice: FlaskService, public endpoint: Endpoint, private toastr: ToastrService) {

  }
  resultData: any = undefined;
  graph: any = undefined;
  traces: any;

  formatData() {
    console.log("formatData");
    let trace = [];
    for (let index = 0; index < this.resultData[0].length; index++) {
      console.log("index", index);
      for (let y = 0; y < this.resultData[0][index].length; y++) {
        console.log("y", y);
        console.log("value:", index);
      }
    }
  }

  deleteCombination() {
    this.flaskSerice.deleteCombination().subscribe((result: any) => {
      console.log("Delete combination");
      console.log(result);
      if (result['success']) {
        this.toastr.success(result['data'], '');
        this.resultData = undefined;
      } else {
        this.toastr.error(result['data'], '');
      }
    });
  }

  ngOnInit(): void {
    this.generatePlot();
    this.flaskSerice.generateCombinationPlot$.subscribe(() => {
      this.generatePlot();
    });
  }

  selectEvidence() {
    this.dialog.open(ResultevidenceComponent, {
      height: '700px',
      width: '1000px',
      data: {
        name: this.endpoint.name
      }
    });
  }

  generatePlot() {
    this.flaskSerice.getDataCombinationGraph().subscribe((result: any) => {
      console.log("Fetching graph data...");
      if (result['success']) {
        this.resultData = result['data'];
        console.log("Combination Data:");
        console.log(this.resultData);
      } else {
        this.resultData = undefined;
        return;
      }

      // Define colors and names for each trace
      const colors = ['rgb(202, 235, 238)', 'rgb(20, 161, 224)', 'rgb(25, 91, 160)'];
      const names = ['Negative', 'Uncertain', 'Positive'];
      this.traces = [];

      // Create a bar trace for each category
      for (let i = 0; i < names.length; i++) {
        const trace = {
          x: this.resultData[0].map((dataPoint: any) => dataPoint[i]), // X-values (data)
          y: this.resultData[1],                                      // Y-values (labels)
          text: this.resultData[0].map((dataPoint: any) => dataPoint[i]), // Add raw integer values as text
          textposition: 'middle center',                              // Force text into the middle of the bar
          textfont: { 
            color: 'black', 
            size: 14, 
            family: 'Roboto, sans-serif' // Match font with axis labels
          },
          insidetextanchor: 'middle', // Ensures centered alignment
          name: names[i],
          orientation: 'h',                                           // Horizontal bar chart
          type: 'bar',
          marker: {
            color: colors[i],
            width: 1
          },
          hoverinfo: 'skip' // Disable hover information for this trace
        };
        this.traces.push(trace);
      }

      console.log(this.traces);
      this.graph = {
        data: this.traces,
        layout: {
          width: 700,
          height: 400,
          title: {
            text: 'Combination of evidence',
            font: { size: 22, color: "black", family: "Roboto, sans-serif"},
            x: 0.45, // Move the title more to the left (adjust this value as needed)
            y: 0.85 // Keeps the vertical positioning unchanged
          },
          barmode: 'stack',
          legend: { 
            traceorder: "normal",
            x: 0.96,          // Move the legend to the far left
            xanchor: 'left', // Align the left side of the legend to the x position
            y: 1,          // Keep the legend at the top (or adjust as needed)
            yanchor: 'top' // Align the top of the legend to the y position
          },
          xaxis: { visible: false },
          yaxis: {
            tickfont: { family: "Roboto, sans-serif", size: 14 }
          },
          bargap: 0.1,
          bargroupgap: 0,
          plot_bgcolor: "transparent",
          paper_bgcolor: "transparent",
          margin: { pad: 5 },
          hovermode: false
        }
      };
      
    });
  }
}

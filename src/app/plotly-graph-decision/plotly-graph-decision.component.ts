import { Component } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';
@Component({
  selector: 'app-plotly-graph-decision',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './plotly-graph-decision.component.html',
  styleUrl: './plotly-graph-decision.component.scss'
})
export class PlotlyGraphDecisionComponent {

  constructor(private flaskService: FlaskService, private endpoint: Endpoint){

  }

graph:any
resultData:any = undefined
// karo
ngOnInit(): void {
                                  //change name here
  this.flaskService.getDataErroPlot("nuevo1").subscribe((result:any)=> {
    console.info("DATA ERROR PLOT")
    this.resultData = result['data']
    console.log(this.resultData)
    this.graph = {
      data: [
        {
          x: this.resultData[0],
          y: this.resultData[1],
          error_y: {
            type: 'data',
            symmetric: true,
            array: this.resultData[2],
            // arrayminus: [0.2, 0.4, 1, 0.2]
          },
        type: 'scatter',
        mode: "lines",
        fill:"toself",
        line: { color: "black" },
        }
      ],
      layout: {
        title: {
          text: 'Bounded probability',
          font: {
            size:22
          }
        },
        yaxis: { title: 'Probability',range: [-0.15,1.15]},
        xaxis: {showgrid:false},
        shapes: [
          {
            type: 'line',
            y0: this.resultData[3], 
            y1: this.resultData[3], 
            line: {
              color: 'red',
              width: 2,
              dash: 'solid',
            }
          }
        ]
  
      },
    };
  })


}
}

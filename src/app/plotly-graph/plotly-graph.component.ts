import { Component,OnInit } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { FlaskService } from '../flask.service';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-plotly-graph',
  standalone: true,
  imports: [CommonModule, PlotlyModule],
  templateUrl: './plotly-graph.component.html',
  styleUrl: './plotly-graph.component.scss'
})


export class PlotlyGraphComponent implements OnInit {
  constructor(private flaskSerice:FlaskService){

  }
  resultData: any = undefined;
  graph: any
traces: any
  formatData(){
    console.log("formatData")
    let trace = []
    for (let index = 0; index <  this.resultData[0].length; index++) {
      
      console.log("index",index)
    for (let y = 0; y < this.resultData[0][index].length; y++) {
        console.log("y",y)
        console.log("value:",index)
      
    } 

    }
  }

  ngOnInit(): void {
    this.flaskSerice.getDataCombinationGraph().subscribe((result:any) => {
      this.resultData = result['data']
      var reversedData = this.resultData[1].reverse()
      const colors = [
        'rgb(202, 235, 238)', 
        'rgb(20, 161, 224)',  
        'rgb(25, 91, 160)'  
      ];
      const names = ['Negative', 'Uncertain', 'Positive'];
      this.traces = [];
      
      for (let i = 0; i < names.length; i++) {
        const trace = {
          x: this.resultData[0].map((dataPoint:any) => dataPoint[i]),
          y: reversedData,                                  
          name: names[i],
          orientation: 'h',
          type: 'bar',
          marker: {
            color: colors[i],
            width: 1
          }
        };
        this.traces.push(trace);
      }
      console.log(this.traces)
       this.graph = {
        data: this.traces,
        layout: {width: 700, height: 400, title:{text:'Combination result',font:{size:14,color:"black",family:"Roboto, sans-serif"}}, barmode: 'stack',legend : {'traceorder':"normal"},xaxis:{'visible':false}, plot_bgcolor:"transparent", paper_bgcolor:"transparent",margin:{pad:5}}
    };

    })
  }


  

}

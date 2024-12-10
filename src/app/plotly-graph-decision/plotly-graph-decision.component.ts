import { Component } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
@Component({
  selector: 'app-plotly-graph-decision',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './plotly-graph-decision.component.html',
  styleUrl: './plotly-graph-decision.component.scss'
})
export class PlotlyGraphDecisionComponent {

graph:any

// karo
ngOnInit(): void {
  this.graph = {
    data: [
      {
        x: ["Negative"],
        y: [0.88],
        error_y: {
          type: 'data',
          symmetric: true,
          array: [0.125],
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
          x0: -0.5, 
          x1: 1.5, 
          y0: 0.5, 
          y1: 0.5, 
          line: {
            color: 'red',
            width: 2,
            dash: 'solid',
          }
        }
      ]

    },
  };
}
}

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


ngOnInit(): void {
  this.graph = {
    data: [
      {
        x: [1, 2, 3, 4],
        y: [2, 1, 3, 4],
        error_y: {
          type: 'data',
          symmetric: false,
          array: [0.1, 0.2, 0.1, 0.1],
          arrayminus: [0.2, 0.4, 1, 0.2]
        },
        type: 'scatter'
      }
    ],
    layout: {
      title: 'Gráfica de ejemplo',
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' }
    }
  };
}
}

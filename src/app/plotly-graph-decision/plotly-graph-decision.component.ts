import { Component,Input } from '@angular/core';
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
  @Input() name: string = ""; 
  constructor(private flaskService: FlaskService, private endpoint: Endpoint){

  }

graph:any
resultData:any = undefined
// karo

ngOnInit(): void {
  this.flaskService.getDataErroPlot(this.name).subscribe((result: any) => {
    console.info("DATA ERROR PLOT");
    this.resultData = result['data'];
    console.log(this.resultData);

    const numLabels = this.resultData[0].length;

    // Define x positions for labels
    const xValues = numLabels === 1 ? [0.5] : [0.3, 0.7];

    // Configure x-axis with ticks closer to the labels and small lines
    const xaxisConfig = {
      showgrid: false,
      tickmode: "array",
      tickvals: xValues, // Position labels correctly
      ticktext: this.resultData[0], // Use label names
      range: [0,1], // Keep x-axis always between 0 and 1
      zeroline: false, // Ensure y-axis is visible
      ticks: 'inside', // Add small ticks inside at label positions
      ticklen: 5, // Small tick length
      tickangle: 0, // Labels will remain horizontal
      tickfont: {
        size: 17, // Increase font size for the labels
        family: "Roboto, sans-serif", // Font style
      },
      tickpad: 15, // Increase space between tick and label
    };

    // Configure y-axis to keep the range but limit the visible line
    const yaxisConfig = {
      title: {
        text: 'Probability', // Title for the y-axis
        font: {
          size: 17, // Font size for y-axis title
          family: 'Roboto, sans-serif', // Font family for y-axis title
        },
        standoff: 15, // Increase distance from the axis
      },

      range: [-0.01, 1.01], // Keep range from -0.15 to 1.15
      zeroline: true, // Keep the zero line visible
      showline: true, // Show the y-axis line
      showgrid: true, // Disable grid lines for y-axis
      ticks: 'outside', // Add small ticks inside at label positions
      ticklen: 5, // Small tick length
      tickpad: 20, // Increase padding between axis and labels
      tickfont: {
        size: 14, // Same font size as x-axis labels
        family: "Roboto, sans-serif", // Font style
      },
    };

    this.graph = {
      data: [
        {
          x: xValues, // Ensure x values match tick positions
          y: this.resultData[1],
          error_y: {
            type: 'data',
            symmetric: true,
            array: Array.isArray(this.resultData[2]) ? this.resultData[2] : [this.resultData[2], this.resultData[2]], // Ensure array format
          },
          type: 'scatter',
          mode: "markers", // No lines, only markers
          marker: { color: "black", size: 1 }, // Customize markers if needed
          showlegend: false,
        },
        {
          x: [0, 1], // Start and end of the line
          y: [this.resultData[3], this.resultData[3]], // Red line data
          type: 'scatter',
          mode: 'lines', // Display the red line
          line: { color: 'red', width: 2, dash: 'dash' }, // Red dashed line
          name: 'Minimum belief', // Name for the red line in the legend
        }
      ],
      layout: {
        title: {
          text: 'Decision-relevant probability bounds',
          font: { size: 22, color: "black", family: "Roboto, sans-serif"},
        },
        yaxis: yaxisConfig, // Apply the y-axis config
        xaxis: xaxisConfig, // Apply the x-axis config
        hovermode: false,
        legend: {
          x: 0.8, // Move the legend outside of the plot area
          y: 0.95, // Align with the top of the plot
          xanchor: 'left', // Anchor legend to the left of the x position
          yanchor: 'top', // Anchor legend to the top of the y position
          font: {
            size: 12, // Smaller font size for the legend
          },
          itemsizing: 'constant',
          traceorder: 'normal', // Normal trace order
          bordercolor: 'gray', // Black border for the legend box
          borderwidth: 0.25, // Border width of the box
          borderpad: 10, // Padding inside the box
          itemheight: 20, // Height of each legend item
          itemwidth: 20, // Width of each legend item
          
        },
      },
    };
  });
}}

// ngOnInit(): void {
//                                   //change name here
//   this.flaskService.getDataErroPlot(this.name).subscribe((result:any)=> {
//     console.info("DATA ERROR PLOT")
//     this.resultData = result['data']
//     console.log(this.resultData)
//     // if(this.resultData[0].length == 1 ){ how modify label settings X asis

//     // }




//     this.graph = {
//       data: [
//         {
//           x: this.resultData[0],
//           y: this.resultData[1],
//           error_y: {
//             type: 'data',
//             symmetric: true,
//             array: this.resultData[2],
//             // arrayminus: [0.2, 0.4, 1, 0.2]
//           },
//         type: 'scatter',
//         mode: "lines",
//         fill:"toself",
//         line: { color: "black" },
//         }
//       ],
//       layout: {
//         title: {
//           text: 'Bounded probability',
//           font: {
//             size:22
//           }
//         },
//         yaxis: { title: 'Probability',range: [-0.15,1.15]},
//         xaxis: {showgrid:false},
//         shapes: [
//           {
//             type: 'line',
//             y0: this.resultData[3], 
//             y1: this.resultData[3], 
//             line: {
//               color: 'red',
//               width: 2,
//               dash: 'solid',
//             }
//           }
//         ]
  
//       },
//     };
//   })


// }
// }


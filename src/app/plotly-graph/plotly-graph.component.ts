import { Component,OnInit,inject } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';
import {MatIconModule} from '@angular/material/icon';
PlotlyModule.plotlyjs = PlotlyJS;
import { ToastrService } from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ResultevidenceComponent } from '../resultevidence/resultevidence.component';

@Component({
  selector: 'app-plotly-graph',
  standalone: true,
  imports: [MatIconModule,CommonModule, PlotlyModule,MatButtonModule],
  templateUrl: './plotly-graph.component.html',
  styleUrl: './plotly-graph.component.scss'
})


export class PlotlyGraphComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(private flaskSerice:FlaskService, public endpoint:Endpoint,private toastr:ToastrService){

  }
  resultData: any = undefined;
  graph: any = undefined;
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
  deleteCombination(){
    this.flaskSerice.deleteCombination().subscribe((result:any)=> {
      console.log("Delete combination")
      console.log(result)
      if(result['success']){
        this.toastr.success(result['data'],'')
        this.resultData = undefined
      }else{
        this.toastr.error(result['data'],'')
      }
    })
  }
  ngOnInit(): void {
    this.generatePlot()
    this.flaskSerice.generateCombinationPlot$.subscribe(()=> {
    this.generatePlot()
    })
  }
  selectEvidence(){

    this.dialog.open(ResultevidenceComponent, {
      height: '700px',
      width: '1000px',
      data: {
       name: this.endpoint.name
      }
    })

 }

//  karo
  generatePlot(){
    this.flaskSerice.getDataCombinationGraph().subscribe((result:any) => {
      console.log("primero")
      console.log(result['success'])
      if(result['success']){
        this.resultData = result['data']
        console.log("endpoint!!")
        console.log(this.endpoint)
    
      }else {
        this.resultData = undefined
        
      }
      const colors = [
        'rgb(202, 235, 238)', 
        'rgb(20, 161, 224)',  
        'rgb(25, 91, 160)'  
      ];
      const names = ['Negative', 'Uncertain', 'Positive'];
      this.traces = [];
      
      for (let i = 0; i < names.length; i++) {
        const trace = {
          x: this.resultData[0].reverse().map((dataPoint:any) => dataPoint[i]),
          y: this.resultData[1].reverse(),                                  
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
        layout: {width: 700, height: 400, title:{text:'Combination result',font:{size:20,color:"black",family:"Roboto, sans-serif"}}, barmode: 'stack',legend : {'traceorder':"normal"},xaxis:{'visible':false}, plot_bgcolor:"transparent", paper_bgcolor:"transparent",margin:{pad:5}}
    };

    })
  }

  

}

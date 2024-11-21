import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Endpoint } from '../globals';
import { FlaskService } from '../flask.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlotlyGraphDecisionComponent } from '../plotly-graph-decision/plotly-graph-decision.component';
@Component({
  selector: 'app-resultevidence',
  standalone: true,
  imports: [  MatDialogActions,PlotlyGraphDecisionComponent,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,MatButtonModule,MatTableModule],
  templateUrl: './resultevidence.component.html',
  styleUrl: './resultevidence.component.scss'
})
export class ResultevidenceComponent implements OnInit {
  evidence_name:string = "";
  evidenceResult:any
  image:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private endpoint:Endpoint,private flaskService:FlaskService){
    this.evidence_name = data.name;
  }
  ngOnInit(): void {
    this.flaskService.getEvidenceResult(this.endpoint.name,this.evidence_name).subscribe((result:any) => {
      if(result['success']){
        console.log(result['data'])
        this.evidenceResult = result['data'];
      }
    })
<<<<<<< HEAD
    this.flaskService.getDataErroPlot(this.evidence_name).subscribe((result:any)=> {
      console.info("DATA ERROR PLOT")
      console.log(result)
    })

=======
>>>>>>> combination
  }
}

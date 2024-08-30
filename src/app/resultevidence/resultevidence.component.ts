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
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-resultevidence',
  standalone: true,
  imports: [  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,MatButtonModule,JsonPipe],
  templateUrl: './resultevidence.component.html',
  styleUrl: './resultevidence.component.scss'
})
export class ResultevidenceComponent implements OnInit {
  evidence_name:string = "";
  evidenceResult = undefined
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private endpoint:Endpoint,private flaskService:FlaskService){
    this.evidence_name = data.name;
  }
  ngOnInit(): void {
    this.flaskService.getEvidenceResult(this.endpoint.name,this.evidence_name).subscribe((result:any) => {
      if(result['success']){
        this.evidenceResult = result['data'];
        console.log(this.evidenceResult)
      }
    })
  }

}

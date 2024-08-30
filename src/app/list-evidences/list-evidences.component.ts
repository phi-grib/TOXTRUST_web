import { Component, OnInit,inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';
import {MatButtonModule} from '@angular/material/button';
import { AddEvidenceComponent } from '../add-evidence/add-evidence.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ResultevidenceComponent } from '../resultevidence/resultevidence.component';
@Component({
  selector: 'app-list-evidences',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,AddEvidenceComponent],
  templateUrl: './list-evidences.component.html',
  styleUrl: './list-evidences.component.scss'
})
export class ListEvidencesComponent  implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(private flaskService:FlaskService,private endpoint:Endpoint){

  }
  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource<string>();
  listEvidences:any[] = []; 

  ngOnInit(): void {
    this.flaskService.getEvidences(this.endpoint.name).subscribe((result:any) => {
      if(result['success']){
        Object.keys(result['data']).forEach(key => {
          const evidence = result['data'][key];
          this.listEvidences.push(evidence);
        });
        this.dataSource.data = this.listEvidences;
      }else{
        console.log("Failed");
      }
    })
  }
  selectEvidence(evidence:any){
     this.dialog.open(ResultevidenceComponent, {
       height: '700px',
       width: '1000px',
       data: {
        name: evidence.name
       }
     })
    
  }

  openNewEvidence() {
    this.dialog.open(AddEvidenceComponent, {
      height: '700px',
      width: '1000px',
    });
  }

}

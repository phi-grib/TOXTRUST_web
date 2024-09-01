import { Component, OnInit,inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AddEvidenceComponent } from '../add-evidence/add-evidence.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ResultevidenceComponent } from '../resultevidence/resultevidence.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-evidences',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,AddEvidenceComponent,MatIconModule],
  templateUrl: './list-evidences.component.html',
  styleUrl: './list-evidences.component.scss'
})
export class ListEvidencesComponent  implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(private toastr:ToastrService,private flaskService:FlaskService,private endpoint:Endpoint){

  }
  displayedColumns: string[] = ['position', 'name','delete'];
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
  deleteEvidence(name:any,event: MouseEvent){
    event.stopPropagation();
    this.flaskService.deleteEvidence(this.endpoint.name,name).subscribe((result:any)=>{
      if(result['success']){
        this.toastr.success(result['data'],'')
       }else{
        this.toastr.error(result['data'],'')

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

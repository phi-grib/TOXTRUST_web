import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddEvidenceComponent } from '../add-evidence/add-evidence.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResultevidenceComponent } from '../resultevidence/resultevidence.component';
import { ToastrService } from 'ngx-toastr';
import { CapitalizePipe } from '../capitalize.pipe';
@Component({
  selector: 'app-list-evidences',
  standalone: true,
  imports: [CapitalizePipe, MatTableModule, MatButtonModule, AddEvidenceComponent, MatIconModule, MatCheckboxModule, MatTooltipModule],
  templateUrl: './list-evidences.component.html',
  styleUrl: './list-evidences.component.scss'
})
export class ListEvidencesComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(private toastr: ToastrService, private flaskService: FlaskService, public endpoint: Endpoint) {

  }
  displayedColumns: string[] = ['name', 'type', 'weight', 'relevance', 'negative', 'uncertain', 'positive', 'decision', 'combine', 'delete'];
  dataSource = new MatTableDataSource<string>();
  listEvidences: any[] = [];
  listCombineEvidences: any[] = [];
  ngOnInit(): void {
    this.getEvidences();
    this.flaskService.updateEvidenceList$.subscribe(result => {
      this.getEvidences();
    })
  }
  getEvidences() {
    this.listEvidences = [];
    this.flaskService.getEvidences(this.endpoint.name).subscribe((result: any) => {
      if (result['success']) {
        console.log("list evidences:")
        console.log(result['data'])
        Object.keys(result['data']).forEach(key => {
          const evidence = result['data'][key];
          this.listEvidences.push(evidence);
        });
        this.dataSource.data = this.listEvidences;
      } else {
        console.log("Failed");
      }
    })
  }

  selectEvidence(evidence: any) {
    this.dialog.open(ResultevidenceComponent, {
      height: '700px',
      width: '1000px',
      data: {
        name: evidence.name
      }
    })

  }
  deleteEvidence(evidence: any, event: MouseEvent) {
    console.log("endpoint name" + this.endpoint.name)
    console.log("evidence name" + evidence.name)
    event.stopPropagation();


    this.flaskService.deleteEvidence(this.endpoint.name, evidence.name).subscribe((result: any) => {
      console.log(result)
      if (result['success']) {
        this.getEvidences();
        this.toastr.success(result['data'], '');
      } else {
        this.toastr.error(result['data'], '');
      }
    })
  }
  openNewEvidence() {
    this.dialog.open(AddEvidenceComponent, {
      maxHeight: "80vh",
      width: '1000px',
    });
  }


  runCombine() {

    this.flaskService.shouldCombine(this.listCombineEvidences).subscribe((result: any) => {
      if (result['success']) {

        this.toastr.success(result['message'], '');
        this.flaskService.runCombine().subscribe((result: any) => {
          if (result['success']) {
            this.endpoint.shouldCombine = this.listCombineEvidences
            this.toastr.success(result['message'], '');
            this.flaskService.updateCombinationPlot();
            var nextStep = document.getElementsByTagName("mat-step-header")[3] as HTMLElement
            nextStep.click();
          } else {
            this.toastr.error(result['message'], '');
          }
        })

      } else {
        this.toastr.error(result['message'], '');
      }
    }, (error) => {
      console.log(error)
    })
  }

  includeEvidence(event: any, row: any) {
    console.log(event.checked)
    if (event.checked) {
      this.listCombineEvidences.push(this.listEvidences[row].name)
    } else {
      this.listCombineEvidences = this.listCombineEvidences.filter(
        (evidence) => evidence !== this.listEvidences[row].name
      );
    }
  }

}

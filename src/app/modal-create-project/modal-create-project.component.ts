import { Component,ViewChild,ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-create-project',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './modal-create-project.component.html',
  styleUrl: './modal-create-project.component.scss'
})
export class ModalCreateProjectComponent {
  constructor(private flaskService: FlaskService,private endpoint:Endpoint,private toastr: ToastrService){

  }
onSubmit(name:string){
  this.flaskService.createEndpoint(name).subscribe(result => {
    this.endpoint.name = name;
   
    this.flaskService.getListEndpoints().subscribe(result => {
      this.endpoint.listEndpoints = result;
    })
  document.getElementById("closeBtn")?.click();
  this.toastr.success('SUCCESSFULLY CREATED!', '');
  },
  error => {
    console.log(error)
  })
}
}

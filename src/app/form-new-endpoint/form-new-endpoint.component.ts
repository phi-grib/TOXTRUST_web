import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';

@Component({
  selector: 'app-form-new-endpoint',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule],
  templateUrl: './form-new-endpoint.component.html',
  styleUrl: './form-new-endpoint.component.scss'
})
export class FormNewEndpointComponent {
  constructor(private flaskService: FlaskService,private endpoint:Endpoint){

  }

  onSubmit(form:any){
    this.flaskService.createEndpoint(form.value.name).subscribe(result => {
      this.endpoint.name = form.value.name;
    },
  error => {
    console.log(error)
  })
 }
}

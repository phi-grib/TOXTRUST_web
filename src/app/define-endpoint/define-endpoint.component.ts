import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { FlaskService } from '../flask.service';

@Component({
  selector: 'app-define-endpoint',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule],
  templateUrl: './define-endpoint.component.html',
  styleUrl: './define-endpoint.component.scss'
})
export class DefineEndpointComponent {
  constructor(private flaskService: FlaskService){

  }
  onSubmit(form:any){
     this.flaskService.defineEndpoint(form.value).subscribe(result => {
       console.log(result)
     },
   error => {
     console.log(error)
   })
  }

}

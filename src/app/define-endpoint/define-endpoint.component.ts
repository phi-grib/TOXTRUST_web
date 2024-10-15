import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FlaskService } from '../flask.service';
import { ToastrService } from 'ngx-toastr';
import { Endpoint } from '../globals';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-define-endpoint',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatRadioModule],
  templateUrl: './define-endpoint.component.html',
  styleUrl: './define-endpoint.component.scss'
})
export class DefineEndpointComponent {
  constructor(public endpoint:Endpoint,private flaskService: FlaskService, private toastr: ToastrService) {

  }
  onSubmit(generalForm: any) {
  console.info("General form")
  console.info(generalForm.value)
    this.flaskService.defineEndpoint(generalForm.value).subscribe(

      (result: any) => {
        if (result["success"]) {
          this.toastr.success(result["message"], '');
         var nextStep = document.getElementsByTagName("mat-step-header")[1] as HTMLElement
         nextStep.click();
        } else {
          this.toastr.error(result["message"], '');
        }
      },
      (error) => {
        console.log(error)
      })
  }
}

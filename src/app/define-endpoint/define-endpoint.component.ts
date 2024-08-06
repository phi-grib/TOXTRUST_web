import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FlaskService } from '../flask.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-define-endpoint',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './define-endpoint.component.html',
  styleUrl: './define-endpoint.component.scss'
})
export class DefineEndpointComponent {
  constructor(private flaskService: FlaskService, private toastr: ToastrService) {

  }
  onSubmit(form: any) {
    console.log("aqui")
    this.flaskService.defineEndpoint(form.value).subscribe(

      (result: any) => {
        if (result["success"]) {
          this.toastr.success(result["message"], '');
        } else {
          this.toastr.error(result["message"], '');
        }
      },
      (error) => {
        console.log(error)
      })
  }

}

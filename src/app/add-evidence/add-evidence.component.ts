import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-add-evidence',
  standalone: true,
  imports: [FormsModule,MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-evidence.component.html',
  styleUrl: './add-evidence.component.scss'
})
export class AddEvidenceComponent {
  
  constructor() {

  }

  onSubmit(form: any) {
    console.log("Formulario")
    console.log(form.value)
  }
  displayFieldPositive(form: any){
    console.log(form.value)
  if(!form.value.positive){
    form.controls['positive_value'].reset();
  }
  }
  displayFieldNegative(form: any){
    if(!form.value.negative){
      form.controls['negative_value'].reset();
    }
  }

}

import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-rule',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatSelectModule],
  templateUrl: './select-rule.component.html',
  styleUrl: './select-rule.component.scss'
})
export class SelectRuleComponent {

onSubmit(form:any){
  console.log("select rule")
  console.log(form.value)
}

}
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-select-rule',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './select-rule.component.html',
  styleUrl: './select-rule.component.scss'
})

export class SelectRuleComponent {
  ruleDisabled: boolean = false;
  inagakiSelected: boolean = true;
onSubmit(form:any){
  console.log("select rule")
  console.log(form.value)
}

AutoRuleSelection(form:any){
  this.ruleDisabled = form.value.auto;
}
selectRule(event:MatSelectChange){
  if(event.value == "Inagaki"){
    this.inagakiSelected = false;
  }
}

}
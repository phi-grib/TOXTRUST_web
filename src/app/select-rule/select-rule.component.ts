import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FlaskService } from '../flask.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-select-rule',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './select-rule.component.html',
  styleUrl: './select-rule.component.scss'
})

export class SelectRuleComponent {
  constructor (private flaskService:FlaskService,private toastr:ToastrService){

  }
  ruleDisabled: boolean = false;
  inagakiSelected: boolean = true;
onSubmit(form:any){
  console.log(form.value)
  if(form.value.auto){
    form.value.rule = 'auto'
    form.value.factor = 'balance'
  }
  this.flaskService.selectRule(form.value).subscribe((result:any)=>{
    if(result['success']){
       this.toastr.success(result['message'],'');
      }else{
       this.toastr.error(result['message'],'');
      }
  })
}
setValueWoE(form:any){
  this.flaskService.shouldWoeInput(form.value.WoE).subscribe((result:any)=>{
    if(result['success']){
      this.toastr.success(result['message'],'');
    }else{
      this.toastr.error(result['message'],'');
    }
  })
}
AutoRuleSelection(form:any){
  this.ruleDisabled = form.value.auto;
}
selectRule(event:MatSelectChange){
  if(event.value == "Inagaki"){
    this.inagakiSelected = false;
  }else {
    this.inagakiSelected = true;

  }
}



}
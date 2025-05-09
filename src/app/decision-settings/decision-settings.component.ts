import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FlaskService } from '../flask.service';
import { ToastrService } from 'ngx-toastr';
import { Endpoint } from '../globals';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-decision-settings',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './decision-settings.component.html',
  styleUrl: './decision-settings.component.scss'
})
export class DecisionSettingsComponent {

  constructor(private flaskService:FlaskService,private toastr:ToastrService,public endpoint:Endpoint){

  }
  ruleDisabled: boolean = true;
  inagakiSelected: boolean = true;
  onSubmit(form:any){
 
    form.value.factor = Number(form.value.factor)
    if(form.value.auto){
      form.value.rule = 'auto'
      form.value.factor = 0.5
    }
    this.flaskService.selectRule(form.value).subscribe((result:any)=>{
      if(result['success']){
         this.toastr.success(result['message'],'');
        }else{
         this.toastr.error(result['message'],'');
        }
    })
    var DecisionForm = {}
    DecisionForm  = {'maxUncertainty':this.endpoint.maxUncertainty,'minBelief':this.endpoint.minBelief }

    this.flaskService.callDecisionInput(DecisionForm).subscribe((result:any)=>{
      if(result['success']){
        this.toastr.success(result['message'],'')
          var nextStep = document.getElementsByTagName("mat-step-header")[2] as HTMLElement
         nextStep.click();
      }else {
        this.toastr.error(result['message'],'')
      }
    },
  (error)=> {
    console.log(error)
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
      this.endpoint.inagakiScale = undefined
    }
  }
}

import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FlaskService } from '../flask.service';
import { ToastrService } from 'ngx-toastr';
import { Endpoint } from '../globals';
@Component({
  selector: 'app-decision-settings',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule],
  templateUrl: './decision-settings.component.html',
  styleUrl: './decision-settings.component.scss'
})
export class DecisionSettingsComponent {

  constructor(private flaskService:FlaskService,private toastr:ToastrService,public endpoint:Endpoint){

  }

  onSubmitDecision(decisionForm:any){
    console.log("ENDPOINT")
    console.log(this.endpoint)
    this.flaskService.callDecisionInput(decisionForm.value).subscribe((result:any)=>{
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
}

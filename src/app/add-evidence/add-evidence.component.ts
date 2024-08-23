import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FlaskService } from '../flask.service';
import { Endpoint } from '../globals';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-evidence',
  standalone: true,
  imports: [FormsModule,MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-evidence.component.html',
  styleUrl: './add-evidence.component.scss'
})
export class AddEvidenceComponent {
  data:any = {}
  constructor(private flaskService:FlaskService,private endpoint:Endpoint,private toastr:ToastrService) {

  }

  onSubmit(form: any) {
    console.log("formulario")
    console.log(form.value)
    this.data['result'] = {outcome:[],proba:'',value:[]}
    this.data['reliability'] = {metric:[],value: []}
    this.data['name'] = form.value.name
    this.data['source'] = form.value.source
    this.data['weight'] = form.value.weight
    this.data['relevance'] = form.value.relevance
    this.data['result']['proba'] = false;
    if(form.value.positive == true){
      this.data['result']['outcome'].push('positive')
      if(form.value.positive_value){
        this.data['result']['value'].push(form.value.positive_value)
        this.data['result']['proba'] = true
      }
    }
    if(form.value.negative != ''){
      this.data['result']['outcome'].push('negative')
      if(form.value.negative_value){
        this.data['result']['value'].push(form.value.negative_value)
        this.data['result']['proba'] = true;
      }
    }
    if(form.value.reliability_positive !='' && form.value.reliability_positive != undefined ){
      this.data['reliability']['metric'].push(form.value.reliability_positive)
      this.data['reliability']['value'].push(form.value.reliability_score_positive)
    }
    if(form.value.reliability_negative != undefined && form.value.reliability_negative != '' ){
      this.data['reliability']['metric'].push(form.value.reliability_negative)
      this.data['reliability']['value'].push(form.value.reliability_score_negative)

    }
    console.log(this.data)
    this.flaskService.evidenceInput(this.endpoint.name,this.data).subscribe((result: any) => {
      if(result['success']){
        this.toastr.success(result['message'],'')
      }
    })
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

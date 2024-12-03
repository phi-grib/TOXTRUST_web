import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from './globals';

@Injectable({
  providedIn: 'root'
})

export class FlaskService {

  constructor(private http: HttpClient,private endpoint:Endpoint) { }
  
  getListEndpoints():Observable<string[]>{
    const url = environment.baseUrl +"list"
    return this.http.get<string[]>(url);
  }
  getEndpoint(project_name:string){
    const url = environment.baseUrl + "endpoint_data/"+project_name;
    return this.http.get(url)

  }
  getEvidences(name:string){
    const url = environment.baseUrl +"evidences/"+name;
    return this.http.get(url);
  }

  createEndpoint(name:string){
    const url: string = environment.baseUrl + "new/" +name
    return this.http.post(url,{})
  }

  getEvidenceResult(endpoint_name:string,evidence_name:string){
    const url: string = environment.baseUrl + "evidence_result/"+endpoint_name+"/"+evidence_name;
    return this.http.get(url)
  }

  evidenceInput(name:string,data:any){
    const url: string = environment.baseUrl + "call_evidence_input/"+name;
    return this.http.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  defineEndpoint(data:any){

   const url: string = environment.baseUrl + "call_endpoint_input/" +this.endpoint.name
   return this.http.post(url, data, {
    headers: { 'Content-Type': 'application/json' }
  });
  }

  getDataCombinationGraph(){
    const url: string = environment.baseUrl+"combination_data/"+this.endpoint.name
    return this.http.get(url)
  }

  selectRule(data:any){
    const url: string = environment.baseUrl + "select_rule/"+this.endpoint.name;
    return this.http.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteEndpoint(endpoint_name:string){
    const url: string = environment.baseUrl + "delete_endpoint/" +endpoint_name
    return this.http.delete(url);
  }

  deleteEvidence(endpoint_name:string,evidence_name:string){
    const url: string = environment.baseUrl + "delete_evidence/" +endpoint_name+"/"+evidence_name
    return this.http.delete(url);
  }
  deleteCombination(){
    const url: string = environment.baseUrl + "delete_combination/" +this.endpoint.name
    return this.http.delete(url);
  }
  getEvidenceImagePath(endpoint_name:string,evidence_name:string){
    const url: string = environment.baseUrl + "evidence_image_path/"+endpoint_name+"/"+evidence_name
    return this.http.get(url,{ responseType: 'blob' })
  }


  private generateCombinationPlot = new Subject<any>();
  generateCombinationPlot$ = this.generateCombinationPlot.asObservable();

  updateCombinationPlot(){
    this.generateCombinationPlot.next('')
  }

  private updateEvidenceList = new Subject<any>();
  updateEvidenceList$ = this.updateEvidenceList.asObservable()
  UpdateEvidenceList(){
        this.updateEvidenceList.next('')
  }

  callDecisionInput(data:any){
    const url: string = environment.baseUrl + "call_decision_input/"+this.endpoint.name
    return this.http.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  shouldCombine(data:any){
    const url: string = environment.baseUrl + "should_combine/"+this.endpoint.name
    return this.http.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  runCombine(){
    const url: string = environment.baseUrl + "run_combine/"+this.endpoint.name;
    return this.http.get(url)
  }

  shouldWoeInput(WoE:any){
    const url: string = environment.baseUrl + "WoEinput/"+this.endpoint.name+"/"+WoE;
    return this.http.get(url)
  }
  getDataErroPlot(evidence_name:string){
    const url: string = environment.baseUrl + "data_error_plot/"+this.endpoint.name +"/"+evidence_name;
    return this.http.get(url)
  }

}

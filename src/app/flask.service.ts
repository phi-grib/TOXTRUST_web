import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { Observable } from 'rxjs';
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

  deleteEndpoint(endpoint_name:string){
    const url: string = environment.baseUrl + "delete_endpoint/" +endpoint_name
    return this.http.delete(url);
  }

  deleteEvidence(endpoint_name:string,evidence_name:string){
    const url: string = environment.baseUrl + "delete_evidence/" +endpoint_name+"/"+evidence_name
    return this.http.delete(url);
  }
}

import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FlaskService {

  constructor(private http: HttpClient) { }
  
  getListEndpoints():Observable<string[]>{
    const url = environment.baseUrl +"list"
    return this.http.get<string[]>(url);
  }

  defineEndpoint(data:any){
    console.log("data:")
    console.log(data)
    const formData = new FormData();
    formData.append("compound",data.compound)
    formData.append("id",data.id)
    formData.append("structure",data.structure)
   const url: string = environment.baseUrl + "new/" +data.compound
   console.log(url)
   return this.http.put(url,formData)
  }
}

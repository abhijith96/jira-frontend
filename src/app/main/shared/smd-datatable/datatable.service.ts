import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _baseUrl } from '../../content/apps/apiCall';
@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  private _baseUrl = _baseUrl;
  constructor(private http : HttpClient) { }
  
  get(url,params? ){
          if(params){
            console.log("Making request tooo   " + this._baseUrl+  url +'?' +params)
              return this.http.get( this._baseUrl+  url +'?' +params);         
          }
          else{
            return this.http.get( this._baseUrl+url);                       
          }
  }


  
}

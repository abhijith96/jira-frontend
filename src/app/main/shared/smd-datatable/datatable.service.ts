import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  private _baseUrl = "http://192.168.70.122:3000/api/";
  constructor(private http : HttpClient) { }
  
  get(url ){
          return this.http.get( this._baseUrl+  url);
  }


  
}

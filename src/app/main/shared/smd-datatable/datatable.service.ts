import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _baseUrl } from '../../content/apps/apiCall';
@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  private _baseUrl = _baseUrl;
  constructor(private http : HttpClient) { }
  
  get(url ){
          return this.http.get( this._baseUrl+  url);
  }


  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _baseUrl } from '../apiCall';
@Injectable({
  providedIn: 'root'
})
export class NewIssueTypeService {
  private _baseUrl = _baseUrl;
  constructor(private http : HttpClient) { }

  getAvailFields(){
      return this.http.get(_baseUrl + 'fields')
  }
}

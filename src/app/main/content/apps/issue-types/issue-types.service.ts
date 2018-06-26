import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _baseUrl } from '../apiCall';
@Injectable({
  providedIn: 'root'
})
export class IssueTypesService {
  private _baseUrl = _baseUrl
  constructor(private http : HttpClient) { }
  
  getIssueTypes(){
    return this.http.get(this._baseUrl + 'issuetypes')
  }
  deleteaIssueType(id){
    console.log("Deleeting " + JSON.stringify(id[0]))
      return this.http.post(_baseUrl + 'issuetype/delete',id[0])
  }
}

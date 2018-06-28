import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { _baseUrl } from '../apiCall';
@Injectable({
  providedIn: 'root'
})
export class NewIssueService {
  private _baseUrl =_baseUrl;
  constructor(private http : HttpClient) { }

  getIssueTypes(){
        return this.http.get(this._baseUrl + 'issuetypes')
  }
  getProjectIssueTypes(project){
    console.log("Project id is " + JSON.stringify(project))
      return this.http.get(_baseUrl + 'project/getissuetypes/' +project.pid )
  }

  getSelectedIssueTypeFields(typeId){
      return this.http.get(_baseUrl + 'issuetypes/' + typeId)
  }

  getProjectSelectedIssueTypeFields(data){
      return this.http.post(_baseUrl+'project/issuetype/config',data)
  }
  saveNewIssue(issue){
      return this.http.post(_baseUrl + 'issues',issue)
  }
  getProjectsList(){
      return this.http.get(_baseUrl+'projects')
  }
  getUsersFromServer(){
    return this.http.get(_baseUrl + 'users')
  }
  
}

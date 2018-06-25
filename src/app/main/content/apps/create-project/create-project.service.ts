import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { _baseUrl } from '../apiCall';
@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {
  private _baseUrl =_baseUrl;
  
  constructor(private http : HttpClient) { }
 
  getUsersFromServer(){
    return this.http.get(_baseUrl + 'users')
  }  
  createProject(data){
      return this.http.post(_baseUrl + 'projects',data)
  }
}

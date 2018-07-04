import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _baseUrl } from '../apiCall';
import { Observable  } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ObservableMedia } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class IssueTypesService {
  private _baseUrl = _baseUrl
  constructor(private http : HttpClient) { }
  
  getIssueTypes(){
    return this.http.get(this._baseUrl + 'issuetypes').catch(err=>{
      return Observable.throw(
            "Server Error"
      )
})

  }
  deleteaIssueType(id){
    console.log("Deleeting " + JSON.stringify(id[0]))
      return this.http.post(_baseUrl + 'issuetype/delete',id[0])
          .catch(err=>{
                  return Observable.throw(
                        "Server Error"
                  )
          })
  }
}

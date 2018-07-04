import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {_baseUrl } from '../apiCall'

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private _baseUrl = _baseUrl
  constructor(private http : HttpClient) { }

  getLog(id){
    // console.log("making request to " + JSON.stringify(id))
      return this.http.get( _baseUrl + 'logs/' + id.id)
  }

  revertLogById(id){
        console.log("Reverting   " + JSON.stringify(id))
        return this.http.post(_baseUrl + 'logs/revert',{ _id: id})
  }
}

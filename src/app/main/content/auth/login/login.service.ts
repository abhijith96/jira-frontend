import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { _baseUrl } from '../../apps/apiCall'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  loginNewUser(data){
    console.log("Data from servic is " + JSON.stringify(data,null," "))
      return this.http.post(_baseUrl + 'login',data)
  }
}

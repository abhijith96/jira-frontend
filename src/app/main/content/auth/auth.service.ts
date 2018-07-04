import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { _baseUrl } from '../apps/apiCall'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
//   private _registerUrl = "http://localhost:3000/api/register";
//   private _loginUrl = "http://localhost:3000/api/login";

  areYouLoggedIn = new BehaviorSubject(false);
  currentUser = new BehaviorSubject('')

  constructor( private http : HttpClient, private _router : Router ) {
      this.areYouLoggedIn.next( this.loggedIn())
   }


  loggedIn(){
       return !!localStorage.getItem('token')
      // return this.areYouLoggedIn.getValue()
  }
  logOut(){
        localStorage.removeItem('token')
        this.areYouLoggedIn.next(false)
        this._router.navigate(['user/login'])
        
  }
  getToken(){
      return localStorage.getItem('token')
  }

  
 
  getUserDetails(): any {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      let data = JSON.parse(payload);
      data._id = data.userId
      this.currentUser.next(data)
    } else {
      this.currentUser.next("data")
        
    }
  }


  loginNewUser(data){
    // console.log("Data from servic is " + JSON.stringify(data,null," "))
      return this.http.post(_baseUrl + 'login',data)
  }
  registerNewUser(data){
    return this.http.post(_baseUrl + 'register',data)
}
}

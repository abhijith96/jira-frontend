import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs';

import { AuthService} from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup

  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private authService : AuthService) { }

  ngOnInit() {
    this.loginForm = this.createForm()
  }
  createForm(){
    let newForm = this.formBuilder.group({
      email : ['', Validators.required],
      password :  ['', Validators.required]
    },
  )
    return newForm
}
  loginUser(){
      let userdata = this.loginForm.getRawValue();
      // console.log("Data is   " + JSON.stringify(userdata,null," "))
      this.authService.loginNewUser(userdata).subscribe(
          (res: any)=>{
              // console.log("Yaay user logged in" + JSON.stringify(res,null, " "))

              this.authService.areYouLoggedIn.next(true)
              localStorage.setItem('token',res.token)
              this.authService.getUserDetails()
              
              this.router.navigate(['apps/todos'])
          },
          err=>{
            console.log("ERror is  " + JSON.stringify(err.error.text))
            console.log("Login failed")
          }
      )
  }

}

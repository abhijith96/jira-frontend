import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup
  constructor(private formBuilder : FormBuilder,
              private loginService : LoginService) { }

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
      console.log("Data is   " + JSON.stringify(userdata,null," "))
      this.loginService.loginNewUser(userdata).subscribe(
          (res: any)=>{
              console.log("Yaay user logged in" + JSON.stringify(res,null, " "))
              localStorage.setItem('token',res.token)
          },
          err=>{
            console.log("ERror is  " + JSON.stringify(err.error.text))
            console.log("Login failed")
          }
      )
  }

}

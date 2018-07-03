import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from './register.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  constructor(private formBuilder : FormBuilder,
                private registerService : RegisterService,
                private router : Router) { }

  ngOnInit() {
      this.registerForm = this.createForm()
  }
  createForm(){
      let newForm = this.formBuilder.group({
        name : ['', Validators.required],
        email : ['', Validators.required],
        password :  ['', Validators.required],
        confirmPassword :  ['', Validators.required]
      },
      {
      validator: this.MatchPassword // your validation method
    })
      return newForm
  }

    MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         AC.get('confirmPassword').setErrors( {MatchPassword: true} )
     } else {
         return null
     }
 }

  register(){
      let newUser = this.registerForm.getRawValue();
      console.log("User dat is   " + JSON.stringify(newUser,null," "))
      this.registerService.registerNewUser(newUser).subscribe(
            res=>{
                    console.log("User registered yaay")
                    this.router.navigate(['apps/todos'])
                    
            },
            err=>{
                    console.log("Registration Failed")
            }
      )
  }

}

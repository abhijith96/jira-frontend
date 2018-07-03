import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes,RouterModule } from '@angular/router';

const routes : Routes =[
   {
      path : '**',
      component : LoginComponent
   }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
  ],
  exports : [ LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes,RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

const routes : Routes =[
   {
      path : '**',
      component : LoginComponent
   }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports : [ LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../apps/login/login.component';
import { FuseHelperClassesWidthHeightComponent } from '../ui/helper-classes/tabs/width-height/width-height.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';
import { MatCardModule } from '@angular/material';

const routes : Routes =[
  
    {
      path : 'login',
      loadChildren : './login/login.module#LoginModule'
  },
  {
      path : 'register',
      loadChildren : './register/register.module#RegisterModule'
  },
  {
    path : '**',
    loadChildren : './register/register.module#RegisterModule'
    
    
    
  }
  
  
]
@NgModule({
  imports: [
    FuseSharedModule,
    FuseAngularMaterialModule,
    RouterModule.forChild(routes),
    MatCardModule,
    
    
  ],
  declarations: []
})
export class AuthModule { }

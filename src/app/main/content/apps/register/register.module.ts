import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { Routes,RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes  : Routes = [
    {
        path : '**',
        component : RegisterComponent
    }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule
    
  ],
  exports : [RegisterComponent],
  declarations: [RegisterComponent]
})
export class RegisterModule { }

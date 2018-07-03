import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { Routes,RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes  : Routes = [
    {
        path : '**',
        component : RegisterComponent
    }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports : [RegisterComponent],
  declarations: [RegisterComponent]
})
export class RegisterModule { }

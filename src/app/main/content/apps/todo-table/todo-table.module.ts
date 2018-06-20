import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TodoTableComponent } from './todo-table.component';
import {Routes, RouterModule } from '@angular/router';
import { DatatableModule } from 'app/main/shared/datatable.module';


const routes : Routes = [{
          path : '**',
          component : TodoTableComponent
}]

@NgModule({
  imports: [
        RouterModule.forChild(routes),


        FuseSharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,  
        DatatableModule,
        MatInputModule
        
  ],
  declarations: [TodoTableComponent,
            ],
  exports : [TodoTableComponent]
})
export class TodoTableModule { }

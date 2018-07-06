import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import { DatatableModule } from 'app/main/shared/datatable.module';
import { LogsComponent } from './logs.component';
import { MatIconModule, MatCardModule, MatTabsModule, MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { LogComponent } from './log/log.component';

const routes : Routes = [
  {
      path : ':id',
      component : LogComponent 
  },
  
  {
  path : '**',
  component : LogsComponent
}]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    DatatableModule,
    FuseSharedModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatListModule,
    MatTableModule
    
  ],
  declarations: [LogsComponent, LogComponent],
  exports : [LogsComponent,LogComponent]
})
export class LogsModule { }

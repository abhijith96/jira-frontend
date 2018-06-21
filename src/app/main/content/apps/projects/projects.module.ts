import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule } from '@angular/material';
import { DatatableModule } from 'app/main/shared/datatable.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProjectsComponent } from './projects.component';

import { ProjectComponent} from './project/project.component';

const routes : Routes =[
    {
      path : ':id',
      component : ProjectComponent
    },    
  
  {
      path : '**',
      component : ProjectsComponent
    }
]

@NgModule({
  imports: [
      RouterModule.forChild(routes),
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
      MatInputModule,
      DatatableModule,
      FuseSharedModule
  ],
  declarations : [ProjectsComponent, ProjectComponent
  ],
  exports : [ProjectsComponent,
            ProjectComponent]
})
export class ProjectsModule { }

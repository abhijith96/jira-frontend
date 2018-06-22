import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatCardModule } from '@angular/material';
import { DatatableModule } from 'app/main/shared/datatable.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProjectsComponent } from './projects.component';

import { ProjectComponent} from './project/project.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectIssuesComponent } from './project/project-issues/project-issues.component';
import { ProjectIssueTypesComponent } from './project/project-issue-types/project-issue-types.component';

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
      FuseSharedModule,
      MatTabsModule,
      MatSelectModule,
      MatCardModule
  ],
  declarations : [ProjectsComponent, ProjectComponent, ProjectDetailsComponent, ProjectIssuesComponent, ProjectIssueTypesComponent
  ],
  exports : [ProjectsComponent,
            ProjectComponent,
              ProjectDetailsComponent]
})
export class ProjectsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatCardModule, MatListModule, MatGridListModule, MatDialogModule } from '@angular/material';
import { DatatableModule } from 'app/main/shared/datatable.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProjectsComponent } from './projects.component';

import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectIssuesComponent } from './project/project-issues/project-issues.component';
import { ProjectIssueTypesComponent } from './project/project-issue-types/project-issue-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendHelpComponent } from './project/send-help/send-help.component';
import { AddIssueTypeComponent } from './project/project-issue-types/add-issue-type/add-issue-type.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProjectComponent
  },

  {
    path: '**',
    component: ProjectsComponent
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
    MatCardModule,
    MatListModule,
    FuseSharedModule,
    FormsModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProjectsComponent, ProjectComponent,
     ProjectDetailsComponent, ProjectIssuesComponent, 
     ProjectIssueTypesComponent, SendHelpComponent, AddIssueTypeComponent
  ],
  exports: [ProjectsComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectIssuesComponent,
    ProjectIssueTypesComponent,
  SendHelpComponent],

    entryComponents : [SendHelpComponent,AddIssueTypeComponent]
})
export class ProjectsModule { }

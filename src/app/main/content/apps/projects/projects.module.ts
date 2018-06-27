import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatCardModule, MatListModule, MatGridListModule, MatDialogModule, MatTooltipModule, MatAutocompleteModule } from '@angular/material';
import { DatatableModule } from 'app/main/shared/datatable.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProjectsComponent } from './projects.component';

import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectIssuesComponent } from './project/project-issues/project-issues.component';
import { ProjectIssueTypesComponent } from './project/project-issue-types/project-issue-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddIssueTypeComponent } from './project/project-issue-types/add-issue-type/add-issue-type.component';
import { AddUsersComponent } from './project/project-details/add-users/add-users.component';
import { EditIssueTypeComponent } from './project/project-issue-types/edit-issue-type/edit-issue-type.component';

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
    MatTooltipModule,
    MatAutocompleteModule
  ],
  declarations: [ProjectsComponent, ProjectComponent,
     ProjectDetailsComponent, ProjectIssuesComponent, 
     ProjectIssueTypesComponent,  AddIssueTypeComponent, AddUsersComponent, EditIssueTypeComponent
  ],
  exports: [ProjectsComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectIssuesComponent,
    ProjectIssueTypesComponent,
  ],

    entryComponents : [AddIssueTypeComponent,AddUsersComponent,EditIssueTypeComponent]
})
export class ProjectsModule { }

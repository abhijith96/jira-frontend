import { NgModule } from '@angular/core';
import { IssueTypesComponent } from './issue-types.component';

import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatListModule, MatCardModule, MatToolbarModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes : Routes = [
      {
          path : '**',
          component : IssueTypesComponent
      }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule

  ],
  declarations: [IssueTypesComponent],
  exports : [IssueTypesComponent]
})
export class IssueTypesModule { }

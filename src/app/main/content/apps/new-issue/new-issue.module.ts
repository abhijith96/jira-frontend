import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewIssueComponent } from './new-issue.component';
import { Routes,RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatGridList, MatGridListModule, MatList, MatListModule, MatListItem, MatCardModule, MatSelectionList, MatTabsModule, MatStepperModule } from '@angular/material';


const routes : Routes = [
          {
            path : '**',
            component : NewIssueComponent
          }
]

@NgModule({
  imports: [
    MatGridListModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule, 
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatRippleModule,
    MatTabsModule,
    MatStepperModule
      
  ],

  declarations: [NewIssueComponent],
  exports : [NewIssueComponent]
})
export class NewIssueModule { }

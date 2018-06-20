import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatGridList, MatGridListModule, MatList, MatListModule, MatListItem, MatCardModule, MatSelectionList } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NewIssueTypeComponent } from './new-issue-type.component';

const routes : Routes = [
                          {
                            path : '**',
                            component : NewIssueTypeComponent
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
    
  ],
  declarations: [NewIssueTypeComponent],
  exports : [NewIssueTypeComponent]
})
export class NewIssueTypeModule { }

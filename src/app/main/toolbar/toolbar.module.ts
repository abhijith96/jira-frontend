import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule,MatDialogModule, MatSelectModule, MatTabsModule, MatListModule, MatCardModule, MatGridListModule, MatInputModule, MatTooltipModule, MatAutocompleteModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseToolbarComponent } from 'app/main/toolbar/toolbar.component';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { CreateIssueTypeComponent } from '../content/apps/create-issue-type/create-issue-type.component';
import { CreateIssueComponent } from '../content/apps/create-issue/create-issue.component';
import { CreateProjectComponent } from '../content/apps/create-project/create-project.component';

@NgModule({
    declarations: [
        FuseToolbarComponent,
        CreateIssueTypeComponent,
        CreateIssueComponent,
        CreateProjectComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        MatTabsModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatGridListModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MatTooltipModule,
        MatAutocompleteModule
        
        
    ],
    exports     : [
        FuseToolbarComponent
    ],
    entryComponents : [CreateIssueTypeComponent, CreateIssueComponent, CreateProjectComponent]
    
})
export class FuseToolbarModule
{
}

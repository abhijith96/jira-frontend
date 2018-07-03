import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';
import { AuthGuard } from '../auth/auth.guard';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    
    {
        path        : 'todo',
        loadChildren: './todo/todo.module#FuseTodoModule',
        canActivate : [AuthGuard]
    },
    {
        path: 'todo-table',
        loadChildren  : './todo-table/todo-table.module#TodoTableModule',
        canActivate : [AuthGuard]
    },
    {
        path : 'projects',
        loadChildren : './projects/projects.module#ProjectsModule',
        canActivate : [AuthGuard]
    },
    {
        path : 'issuetypes',
        loadChildren : './issue-types/issue-types.module#IssueTypesModule',
        canActivate : [AuthGuard] 
    },
    {
        path : 'log',
        loadChildren : './log/logs.module#LogsModule',
        canActivate : [AuthGuard]
    },
   
    {
        path : '**',
        loadChildren  : './todo-table/todo-table.module#TodoTableModule',
        canActivate : [AuthGuard]
    }
    
    
    
];

@NgModule({
    imports     : [
        FuseSharedModule,
        RouterModule.forChild(routes),
        FuseAngularMaterialModule
    ],
})
export class FuseAppsModule
{
}

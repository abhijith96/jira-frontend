import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    
    {
        path        : 'todo',
        loadChildren: './todo/todo.module#FuseTodoModule'
    },
    {
        path: 'todo-table',
        loadChildren  : './todo-table/todo-table.module#TodoTableModule'
    },
    {
        path : 'projects',
        loadChildren : './projects/projects.module#ProjectsModule'
    },
    {
        path : 'issuetypes',
        loadChildren : './issue-types/issue-types.module#IssueTypesModule'
    },
    {
        path : 'log',
        loadChildren : './log/logs.module#LogsModule'
    },
    {
        path : '**',
        loadChildren  : './todo-table/todo-table.module#TodoTableModule'
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

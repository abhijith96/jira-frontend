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

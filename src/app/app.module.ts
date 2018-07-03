import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { AppStoreModule } from './store/store.module';


const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: './main/content/apps/apps.module#FuseAppsModule'
    },  
    {
        path : 'user',
        loadChildren : './main/content/auth/auth.module#AuthModule'
    },
     {
        path        : '',
        loadChildren:  './main/content/auth/auth.module#AuthModule'
                
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
      

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,

        AppStoreModule,
        FuseMainModule,
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}

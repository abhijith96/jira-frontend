import { Component, ElementRef, HostBinding, Inject, OnDestroy, Renderer2, ViewEncapsulation, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs';
import { AuthService } from './content/auth/auth.service'
import { FuseConfigService } from '@fuse/services/config.service';

import { navigation } from 'app/navigation/navigation';

@Component({
    selector     : 'fuse-main',
    templateUrl  : './main.component.html',
    styleUrls    : ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseMainComponent implements OnDestroy,OnInit
{
    onConfigChanged: Subscription;
    fuseSettings: any;
    navigation: any;
    
    isLoggedIn =false;

    @HostBinding('attr.fuse-layout-mode') layoutMode;

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private fuseConfig: FuseConfigService,
        private platform: Platform,
        private authService : AuthService,
        
        @Inject(DOCUMENT) private document: any
    )
    {   
        this.onConfigChanged =
            this.fuseConfig.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                        this.layoutMode = this.fuseSettings.layout.mode;
                    }
                );

        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.document.body.className += ' is-mobile';
        }

        this.navigation = navigation;
    }
    ngOnInit(){
        this.authService.areYouLoggedIn.subscribe(
            res=>{
                    this.isLoggedIn = res;
            }
        )
    }

    ngOnDestroy()
    {
        this.onConfigChanged.unsubscribe();
    }

    addClass(className: string)
    {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    removeClass(className: string)
    {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}

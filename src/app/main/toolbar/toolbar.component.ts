import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { AuthService} from '../content/auth/auth.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { NewIssueTypeComponent } from '../content/apps/new-issue-type/new-issue-type.component';
import { CreateIssueTypeComponent } from '../content/apps/create-issue-type/create-issue-type.component';
import { CreateIssueComponent } from '../content/apps/create-issue/create-issue.component';
import { CreateProjectComponent } from '../content/apps/create-project/create-project.component';
import { user } from '../content/apps/user'

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent
{
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    noNav: boolean;
    navigation: any;

    currentUser = user
    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private sidebarService: FuseSidebarService,
        private translate: TranslateService,
        public dialog: MatDialog,
        private authService : AuthService
    )
    {
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'us'
            },
            {
                'id'   : 'tr',
                'title': 'Turkish',
                'flag' : 'tr'
            }
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.fuseConfig.onConfigChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
            this.noNav = settings.layout.navigation === 'none';
        });

        this.navigation = navigation;
    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang)
    {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }
    createIssueType(){
        let dialogRef = this.dialog.open(CreateIssueTypeComponent
            , {
            width: '700px',
            // data: { name: this.name, animal: this.animal }
          }
        );
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
          });
    }
    
    createIssue(){
        let dialogRef = this.dialog.open(CreateIssueComponent,
        {
            width : '700px',   
        })
    }    
    createProject(){
        let dialogRef = this.dialog.open(CreateProjectComponent,
        {
            width : '700px'
        })
    }


    //Authentication

    logoutUser(){
        this.authService.logOut()
        // localStorage.removeItem('token')
        // this.router.navigate(['user/login'])
    }


    isLoggedIn(){
        return this.authService.loggedIn()
    }

    gotoLogin(){
        this.router.navigate(['user/login'])            
    }
    gotoRegister(){
        this.router.navigate(['user/register'])                    
    }
}


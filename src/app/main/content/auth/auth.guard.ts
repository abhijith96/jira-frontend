import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router : Router , private authService : AuthService){ }

    canActivate() : boolean{
        if(this.authService.loggedIn()){
            return true
        }
        else{
            console.log("Uh OH You're not loggedin")
            this._router.navigate(['user/login'])
            return false 
        }
    }

}

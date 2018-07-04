import { Injectable, Injector } from '@angular/core';
import {  HttpInterceptor } from '@angular/common/http'
import { nextTick } from 'q';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector : Injector) { }
  intercept(req,next){
      let authService = this.injector.get(AuthService)
      let token = authService.getToken()
      let tokenizedReq = req.clone({
        setHeaders : {
            Authorization : `Bearer ${token}`
        }
      })
    return next.handle(tokenizedReq)
  }

}

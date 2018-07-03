import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { _baseUrl} from '../../apps/apiCall'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  registerNewUser(data){
      return this.http.post(_baseUrl + 'register',data)
  }
}

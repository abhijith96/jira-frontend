import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { _baseUrl} from '../../apiCall';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _baseUrl = _baseUrl;
  constructor(private http : HttpClient) { }

  getProjectByIdFromServer(data){
      return this.http.get(_baseUrl + 'projects/' + data.id)
  }
}

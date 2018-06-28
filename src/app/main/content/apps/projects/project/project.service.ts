import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { _baseUrl} from '../../apiCall';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _baseUrl = _baseUrl;
  // selectedProject :  BehaviorSubject<any> = new BehaviorSubject([]);
  // selectedProjectObservable =this.selectedProject.asObservable();
  selectedProject : any;
  
  constructor(private http : HttpClient) { }


  

  getProjectByIdFromServer(data){
      // this.http.get(_baseUrl + 'projects/' + data.id).subscribe(
      //   data=>{
      //         this.selectedProject.next(data)
      //         console.log(this.selectedProject)
      //     }
      // )
      return this.http.get(_baseUrl + 'projects/' + data.id)
  }

  getIssuesFromServer(id){
    console.log("Getting issues from serve .....")
        return this.http.get(_baseUrl + 'projects/addissues/'+id)
  }
  sendNewIssueTypes(id,issueTypesArray){
        return this.http.post(_baseUrl + 'projects/add-issue-type', { projectId: id, issueTypes : issueTypesArray })
  }

  deleteaProject(id){
    console.log("DEleteing  "+ id)
      return this.http.post(_baseUrl + 'project/delete',{id})
  }

  editProjectDetails(data){
      return this.http.post(_baseUrl + 'edit/project',data)
  }
  getUsersFromServer(id){
    return this.http.get(_baseUrl + 'project/getuser/' +id )
  }
  sendUsersToServer(data){
        console.log("SEnding  " +JSON.stringify(data))
        return this.http.post(_baseUrl + 'project/adduser',data)
  }
  removeUser(data){
        return this.http.post(_baseUrl + 'project/removeuser',data)
  }
  getSelectedIssueTypeFields(data){
    console.log("the params aree is " + JSON.stringify(data))
    return this.http.post(_baseUrl + 'project/issuetype/config',data)
}
  //Function to delete fields
  editProjectIssueType(data){
    console.log("Sending to server" + JSON.stringify(data))
      return this.http.post(_baseUrl + 'project/issuetype/deletefields',data)
  }
}

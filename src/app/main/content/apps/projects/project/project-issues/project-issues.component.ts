import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import { ActivatedRoute } from '@angular/router';
import {Subscription } from 'rxjs';
@Component({
  selector: 'app-project-issues',
  templateUrl: './project-issues.component.html',
  styleUrls: ['./project-issues.component.scss']
})
export class ProjectIssuesComponent implements OnInit {

  selectedProjectId : any;
  idSubscription : Subscription;
  constructor(private projectService : ProjectService,
    private route : ActivatedRoute) { }

  ngOnInit() {
        // this.idSubscription = this.route.params.subscribe(param=> {this.getProjectById(param)})
        this.route.params.subscribe(param=> {this.getProjectById(param)})
      
  }

 
  
  getProjectById(data){
    // this.projectService.getProjectByIdFromServer(data)
    // this.projectService.selectedProjectObservable.subscribe(
    //   data=>{
    //            this.selectedProjectId = data._id
    //   }
    // )
    this.projectService.getProjectByIdFromServer(data).subscribe(
          (data : any)=>{
                this.selectedProjectId = data._id;
          }
    )
     
}

}

import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
   selectedProject : any;
   people : any[];
  constructor(private projectService : ProjectService,
    private route : ActivatedRoute) { }

  ngOnInit() {
        this.route.params.subscribe(param=> {this.getProjectById(param)})
          
  }

  getProjectById(data){
    /*
      this.projectService.getProjectByIdFromServer(data)
      this.projectService.selectedProjectObservable.subscribe(
        data=>{
                this.selectedProjectId = data._id
        }
    )*/
    this.projectService.getProjectByIdFromServer(data).subscribe(
          (data : any)=>{
                this.selectedProject = data;
                this.people = data["people"];
                console.log(this.people)
          }
    )
     
}

}

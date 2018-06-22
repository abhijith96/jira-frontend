import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-project-issue-types',
  templateUrl: './project-issue-types.component.html',
  styleUrls: ['./project-issue-types.component.scss'],
})
export class ProjectIssueTypesComponent implements OnInit {

  selectedProject : any;
  issueTypes :any;
  constructor(private projectService : ProjectService,
    private route : ActivatedRoute,
    public dialog: MatDialog) { }

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
                this.issueTypes = data["issueTypes"]
          }
    )

   
     
  }

  openDialog(){
        // this.dialog.open()
  }

}

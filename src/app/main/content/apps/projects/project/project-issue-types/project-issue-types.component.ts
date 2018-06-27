import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInput} from '@angular/material';
import { AddIssueTypeComponent } from './add-issue-type/add-issue-type.component';
import { EditIssueTypeComponent } from './edit-issue-type/edit-issue-type.component';

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
    public dialog: MatDialog,
      private router : Router) { }

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

  // goToCreateNewIssueType(){
  //       this.router.navigate(['/apps/new-issue-type'])
  // }

  addIssueType(){
      let dialogRef = this.dialog.open(AddIssueTypeComponent,
      {
          width : '700px',
          data : { projectId : this.selectedProject}
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.route.params.subscribe(param=> {this.getProjectById(param)})
        
      });
      
  }
  selectIssueType(type){
        console.log(JSON.stringify(type))
        let dialogRef = this.dialog.open(EditIssueTypeComponent,
          {
              width : '700px',
              data : { issueType : type , pid : this.selectedProject._id}
          })
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.route.params.subscribe(param=> {this.getProjectById(param)})
            
          });
  }
}




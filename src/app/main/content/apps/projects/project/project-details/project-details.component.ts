import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInput} from '@angular/material';
import {AddUsersComponent } from './add-users/add-users.component'
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
   selectedProject : any;
   people : any[];
   editable : boolean = false;
   name : string;
   description : string ;
   type : string;
  constructor(private projectService : ProjectService,
    private route : ActivatedRoute,
    public dialog: MatDialog,
    ) { }

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
                // console.info("Current project is " + JSON.stringify(this.selectedProject))
                this.people = data["people"];
                // console.log("People are " +JSON.stringify(this.people))
                // console.log(this.people)
                this.name = data.name
                this.description = data.description
                this.type = data.type              
                
          }
    )
     
}
edit(){
    this.editable =true;
}
  saveChanges(){
      this.editable =false;
      this.selectedProject.name = this.name;
      this.selectedProject.description = this.description;
      this.selectedProject.type = this.type; 
    this.selectedProject.people = this.people
      this.projectService.editProjectDetails(this.selectedProject).subscribe(
          data=>{
              console.log("Updated Databases with changes in project ")
          },
          err=>{
                  console.log("Error saving data")
          }
      )
  }

  addUsers(){
    let dialogRef = this.dialog.open(AddUsersComponent,
    {
        width : '700px',
        data : { projectId : this.selectedProject}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.route.params.subscribe(param=> {this.getProjectById(param)})
      
    });
    
}
deleteUser(data){
        console.info("Deleting user  " + JSON.stringify(data) )
        let req = { pid : this.selectedProject._id, uid : data.user._id }
        console.log("DEleting   ........"+  JSON.stringify(req))
        this.projectService.removeUser(req).subscribe(
            (res : any)=>{
                    console.log("Deleted user success" + JSON.stringify(res))
                    this.people = res["people"];
                    console.log("people is  "+ JSON.stringify(this.people) )
                    
            },
            err=>{
                    console.log("Failed to delete user")
            }

        )
}
cancelEdit(){
    this.editable = false;
}

}

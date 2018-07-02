import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from '../../project.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-add-issue-type',
  templateUrl: './add-issue-type.component.html',
  styleUrls: ['./add-issue-type.component.scss']
})
export class AddIssueTypeComponent implements OnInit {
  issueTypeList : any[] =[];
  selectedProject : any ;
  newFields : any[] = []
  success = false
    constructor(private projectService : ProjectService,
    public dialogRef: MatDialogRef<AddIssueTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
      //  console.log("selected project " + JSON.stringify(this.data.projectId))
      this.getIssueType()
      

  }
  getIssueType(){
      this.projectService.getIssuesFromServer(this.data.projectId._id).subscribe(
          (data :any[])=>{
                // console.log("Existing issue types " +   JSON.stringify(this.data.projectId["issueTypes"]))
                this.issueTypeList =data
                console.log("Issue types are    " )
                
          }
          
      )
      
  }
  addIssueTypes(){
      this.success = false
      this.projectService.sendNewIssueTypes(this.data.projectId._id,this.newFields ).
          subscribe(data=>{
                console.log("Success Issue types added")
                this.success=true
          })
  }
  addType(issueType){


    let exists = false
    this.newFields.forEach(element => {
                if(element._id === issueType._id){
                    exists = true;
                }      
        });
    if(!exists){
        this.newFields.push(issueType._id)
    }
    else{
        this.newFields = this.newFields.filter(ele=>{
              if(ele._id !== issueType._id){
                  return ele._id
              }
        })
    }
        console.log("Exist  ")
        // console.log("New fields   " + JSON.stringify(this.newFields))
  }

  closeDialog(){
    this.dialogRef.close()
}
toggleSuccess(){
    this.success = false;
}
  
}

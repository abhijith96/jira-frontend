import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from '../../project.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-edit-issue-type',
  templateUrl: './edit-issue-type.component.html',
  styleUrls: ['./edit-issue-type.component.scss']
})
export class EditIssueTypeComponent implements OnInit {

  currentIssueType : any;
  fields : any[];
  currentProjectId : any;
  constructor(private projectService : ProjectService,
    public dialogRef: MatDialogRef<EditIssueTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
      //  console.log("selected project " + JSON.stringify(this.data.projectId))
      this.getIssuetype()
      
  }
  getIssuetype(){
      this.currentIssueType = this.data.issueType
      this.currentProjectId = this.data.pid
      // console.log(JSON.stringify(this.currentIssueType))
      this.getFields()
  }
  
  getFields(){
    console.log("Getting dem fields")
    let data = { issueType : this.currentIssueType.name, pid : this.currentProjectId}
      this.projectService.getSelectedIssueTypeFields(data).subscribe(
          (res : any)=>{
              this.fields =res.fields
              console.log("Success received fields   " )
          },
          err=>{
              console.log("Didn't get those pesky fields")
          }

      )
  }
  deleteField(field){
        let data = { issueType : this.currentIssueType.name, pid : this.currentProjectId, fieldId : field._id }
        console.log("Preparing to delete" + JSON.stringify(data))
                
        this.projectService.editProjectIssueType(data).subscribe(
                res=>{
                            console.log("Deletion successfull")
                            this.getFields()
                },
                err=>{  
                        console.log("Deletion error")
                }
        )
  }
  saveChanges(){
      this.closeDialog()
  }
  closeDialog(){
    this.dialogRef.close()
}
}

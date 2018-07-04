import { Component, OnInit } from '@angular/core';
import { IssueTypesService} from './issue-types.service'
import { element } from 'protractor';
@Component({
  selector: 'app-issue-types',
  templateUrl: './issue-types.component.html',
  styleUrls: ['./issue-types.component.scss']
})
export class IssueTypesComponent implements OnInit {
  private issueTypes : any[]
  constructor(private issueTypeService : IssueTypesService,
              ) { }

  ngOnInit() {
    this.getIssueTypesFromServer()
  }

  getIssueTypesFromServer(){
      this.issueTypeService.getIssueTypes().subscribe(
          (data :any[])=>{
              this.issueTypes = data
              // console.log("Issue Types " +JSON.stringify(this.issueTypes) )
          },
          err=>{
                console.log(err)
          }
      )
  }
  deleteIssueType(data){
      // console.log(JSON.stringify(data))
      let id = this.issueTypes.filter( (ele : any)=>{
            if(ele.name === data){
              return ele._id                
            }
          }
       )
      //  console.log("id is " + JSON.stringify(id))
      this.issueTypeService.deleteaIssueType(id).subscribe(
        data=>{
            console.log("Deleted succesfullyy!!!")
              this.getIssueTypesFromServer()
            
        }
      )
  }
  

}

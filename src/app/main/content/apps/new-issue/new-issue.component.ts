import { Component, OnInit } from '@angular/core';
import {NewIssueService } from './new-issue.service'
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.scss']
})
export class NewIssueComponent implements OnInit {
  issueTypes : any[];
  selectedIssueType : any;
  isLinear = false;
  selectedTypeFields : any[];

  issueForm : FormGroup;


  
  constructor(private newIssueService : NewIssueService,
                private formBuilder : FormBuilder) { }

  ngOnInit() {
        this.issueForm =this.createForm()  
        this.getIssueTypes()
  }

  createForm(){
        let newForm = this.formBuilder.group([]);
        return newForm;
  }
  getSelectedType(){
        console.log("You have selected  " + JSON.stringify(this.selectedIssueType))
        this.newIssueService.getSelectedIssueTypeFields(this.selectedIssueType._id).subscribe(
            (data : any)=>{
              
              this.selectedTypeFields = data[0]["fields"];
              console.log("Required fields are " + JSON.stringify(this.selectedTypeFields))
               

              this.selectedTypeFields.map((field)=>{
                    
                this.issueForm.addControl(field.id , new FormControl())
                     })
            //Set value of formcontorl issuetype to value of selected IssueType 
            this.issueForm.patchValue( {"issueType" : this.selectedIssueType.name})
            // this.issueForm["issueType"] = this.selectedIssueType.name;
            console.log( "Issue Type is "+ JSON.stringify(this.issueForm.getRawValue()) )      
            }
        )
  }
  
  getIssueTypes(){
      this.newIssueService.getIssueTypes().subscribe(
          (data:any[] )=>{
                        this.issueTypes = data
                        
                        console.log()
              }
      )
  }
  
  sendForm(){
      let form = this.issueForm.getRawValue();
        form["issueType"]=this.selectedIssueType;
        this.newIssueService.saveNewIssue(form).subscribe(
            data=>{
                  console.log("Yaaay Issue Created" + data)
            }
        )
  }

}

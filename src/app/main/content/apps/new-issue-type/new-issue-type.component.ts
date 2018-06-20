import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl,FormGroup, FormBuilder } from '@angular/forms';

import {NewIssueTypeService } from './new-issue-type.service'



@Component({
  selector: 'app-new-issue-type',
  templateUrl: './new-issue-type.component.html',
  styleUrls: ['./new-issue-type.component.scss']
})
export class NewIssueTypeComponent implements OnInit {
  private availableFields : any[] ;
  private fieldListForm : FormGroup;
  private fieldsArray : any[];




  constructor(private newIssueService : NewIssueTypeService,
              private formBuilder : FormBuilder) { }
  
  ngOnInit() {
      this.getAvailableFieldsFromServer()

      this.fieldListForm = this.createFieldListForm();
  }
  
  createFieldListForm(){
        let newForm = this.formBuilder.group({});

        return newForm
  }



  getAvailableFieldsFromServer(){
      this.newIssueService.getAvailFields().subscribe(
            (data : any[]) =>{
                    this.availableFields =data  ;
                    console.log( "availableFields is : " +  this.availableFields)
            }
      )
  }
  displayAvailableFields(){
        (this.availableFields.map( data=>{
                  console.log(data.name)
        } ) )
  }
  addField(field){
      console.log(field)
      this.fieldListForm.addControl(field.name, new FormControl())
      console.log(this.fieldListForm.getRawValue())
      let stuff =this.fieldListForm.value
      this.fieldsArray = Object.keys(stuff).map(data=>{
        return [data, stuff[data]]
    })
    console.log(this.fieldsArray)
  }
  sendForm(data){
        this.newIssueService.sendNewIssueType(data).subscribe(
              (data)=>{
                    console.log("Succes : New Issue Type Added")
              }
        )
  }
}
//Import matinput thats the problem with the search thing TODO
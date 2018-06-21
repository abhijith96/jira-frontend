import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl,FormGroup, FormBuilder } from '@angular/forms';

import {NewIssueTypeService } from './new-issue-type.service'

@Component({
  selector: 'app-new-issue-type',
  templateUrl: './new-issue-type.component.html',
  styleUrls: ['./new-issue-type.component.scss']
})
export class NewIssueTypeComponent implements OnInit {
  private availableFields : any[] =[ ];
  private fieldListForm : FormGroup;
  private fieldsArray : any[]; //Array of fields currently in form
  private tempFields : any[]; //Array containing all Field Objects in Fields master

  private newFieldName : string;
  private newFieldId : string;
  private newFieldType : string;
  private newFieldIsRequired : string;
  


  constructor(private newIssueService : NewIssueTypeService,
              private formBuilder : FormBuilder) { }
  
  ngOnInit() {
      this.fieldListForm = this.createFieldListForm();
      this.getAvailableFieldsFromServer()

      
  }
  
  createFieldListForm(){
        let newForm = this.formBuilder.group({ "name": new FormControl() });
        return newForm
  }

//TODO Check how you map fields whether its the id or the name

  getAvailableFieldsFromServer(){
      this.newIssueService.getAvailFields().subscribe(
            (data : any[]) =>{
                        this.tempFields =data  ;
                  //    this.availableFields =data
                        this.availableFields = this.addRequiredFieldsToForm()
                        

                  //   console.log("Data after remvoing required fields is" + JSON.stringify(this.tempFields))
                  //   this.availableFields.push.apply(this.availableFields,newfields)
                  //   console.log("available fields are : " + this.availableFields)
                    
                  //Update Form
                    this.updateForm()
            }
      )
  }

  updateForm(){
      let stuff =this.fieldListForm.value
      this.fieldsArray = Object.keys(stuff).map(data1=>{
      return [data1, stuff[data1]]
    })
  }

  addRequiredFieldsToForm(){
        return this.tempFields.filter(field=>{
              if(field.isRequired){
                  this.fieldListForm.addControl(field.name, new FormControl())
              }
            else{      
                  return field
            }         
        })
  }

 
  selectField(field){
      if(this.fieldListForm.contains(field.name)){
            this.fieldListForm.removeControl(field.name)
      }
      else{
            this.fieldListForm.addControl(field.name, new FormControl())     
      }
      //Update Form
      this.updateForm()
  }

  sendForm(data){
        //Iterates through tempfields array , if form.value contains that fields name then
            //    pushes its object id to fields array.
        console.log(data)
        let issueTypeName = this.fieldListForm.getRawValue().name
        let newType = {"name": issueTypeName }
        let formValue :any = this.fieldListForm.getRawValue()
        console.log("Form Value is " + JSON.stringify(formValue))
        let fields : any[] =[];
        this.tempFields.filter(
                  (obj)=>{
                        if( formValue.hasOwnProperty(obj.name)  ){
                              fields.push(obj._id)
                        }
                  }
         )        
         newType["fields"] = fields

        console.log(issueTypeName + " Fields are  " + fields)
        this.newIssueService.sendNewIssueType(newType).subscribe(
              (data)=>{
                    console.log("Succes : New Issue Type Added")
              }
        )
  }

  addNewField(){
        this.fieldListForm.addControl(this.newFieldName,new FormControl())
        let newField = { name :this.newFieldName, 
                         id : this.newFieldId,
                         fieldType : this.newFieldType,
                         isRequired : this.newFieldIsRequired }
        this.newFieldId =""
        this.newFieldName=""
        this.newFieldType = ""
        this.newFieldIsRequired=""
        this.newIssueService.sendNewField(newField)
        .subscribe(data=>{
                  console.log(data)
                  this.tempFields.push(data)
                  console.log("All available fields are : " + JSON.stringify(this.tempFields))
                  this.updateForm()
                  
        },
            error=>{
                        console.log(error)
            })
                         
  }

}
//Import matinput thats the problem with the search thing TODO
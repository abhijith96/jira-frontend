import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInput} from '@angular/material';

import { FormsModule, ReactiveFormsModule, FormControl,FormGroup, FormBuilder } from '@angular/forms';
import {NewIssueTypeService } from './new-issue-type.service'

@Component({
  selector: 'app-create-issue-type',
  templateUrl: './create-issue-type.component.html',
  styleUrls: ['./create-issue-type.component.scss']
})
export class CreateIssueTypeComponent implements OnInit {

 
  issueTypeName : string;
  private availableFields : any[] =[ ];
  private fieldListForm : FormGroup;
  private fieldsArray : any[]; //Array of fields currently in form
  private tempFields : any[]; //Array containing all Field Objects in Fields master

  private newFieldName : string;
  private newFieldId : string;
  private newFieldType : string;
  private newFieldIsRequired : string ="false";
  nameFieldEmpty : Boolean= false;
  projectList : any[];
  selectedProject : any;
  all : string ="ALL";


  constructor(private newIssueService : NewIssueTypeService,
              private formBuilder : FormBuilder,
              public dialogRef: MatDialogRef<CreateIssueTypeComponent>) { }
  
  ngOnInit() {
      this.fieldListForm = this.createFieldListForm();
      this.getAvailableFieldsFromServer()
      this.getProjects()
      
  }
  
  createFieldListForm(){
        let newForm = this.formBuilder.group({ });
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
                  // console.log("Fields are  " + JSON.stringify(field) )
              }
                
            return field
                     
        })
  }

 
  selectField(field){
      if(!field.isRequired){
            console.log("Clicked " + field.name)
            if(this.fieldListForm.contains(field.name)){
                  this.fieldListForm.removeControl(field.name)
            }
            else{
                  this.fieldListForm.addControl(field.name, new FormControl())     
            }
            //Update Form
            this.updateForm()
      }  
      
  }

  sendForm(data){
        if(this.issueTypeName){
            //Iterates through tempfields array , if form.value contains that fields name then
            //    pushes its object id to fields array.
            this.nameFieldEmpty = false            
            console.log(data)
            let issueTypeName = this.issueTypeName;
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
             newType["pid"]=this.selectedProject;
            console.log(issueTypeName + " Fields are  " + fields)
            this.newIssueService.sendNewIssueType(newType).subscribe(
                  (data)=>{
                        console.log("Succes : New Issue Type Added")
                  }
            )
        }
        else{
                  this.nameFieldEmpty = true
        }
        
  }

  addNewField(){
        this.fieldListForm.addControl(this.newFieldId,new FormControl())
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
                  console.log( "Sent New Field to Backend, Recieved Back" + data)
                  this.tempFields.push(data)
                  console.log("All available fields are : " + JSON.stringify(this.tempFields))
                  this.getAvailableFieldsFromServer()
                  
        },
            error=>{
                        console.log(error)
            })
                         
  }

  getProjects(){
        this.newIssueService.getProjectsList().subscribe(
                  (data :any[])=>{
                              this.projectList = data.map(project=>{
                                                return  { name : project.name,
                                                            pid : project._id   };   
                              });
                        console.log("Projects list are  " +this.projectList)
                  }
        )
       
  }

}

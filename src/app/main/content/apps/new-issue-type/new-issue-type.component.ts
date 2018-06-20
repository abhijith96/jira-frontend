import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl,FormGroup, FormBuilder } from '@angular/forms';

import {NewIssueTypeService } from './new-issue-type.service'
import { MatSelectionList} from '@angular/material';


@Component({
  selector: 'app-new-issue-type',
  templateUrl: './new-issue-type.component.html',
  styleUrls: ['./new-issue-type.component.scss']
})
export class NewIssueTypeComponent implements OnInit {
  private availableFields : any[] =[ ];
  private fieldListForm : FormGroup;
  private fieldsArray : any[];
  private tempFields : any[];

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
        let newForm = this.formBuilder.group({});
        return newForm
  }



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
                    let stuff =this.fieldListForm.value
                    this.fieldsArray = Object.keys(stuff).map(data1=>{
                    return [data1, stuff[data1]]
                  })
            }
      )
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
      let stuff =this.fieldListForm.value
      this.fieldsArray = Object.keys(stuff).map(data=>{
        return [data, stuff[data]]
    })
  }

  sendForm(data){
        this.newIssueService.sendNewIssueType(data).subscribe(
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
        },
            error=>{
                        console.log(error)
            })
                         
  }

}
//Import matinput thats the problem with the search thing TODO
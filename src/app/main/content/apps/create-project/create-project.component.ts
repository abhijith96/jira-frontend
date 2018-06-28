import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInput} from '@angular/material';

import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CreateProjectService} from './create-project.service';
import { Observable } from 'rxjs';

import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  projectForm : FormGroup;
  userList : any[]
  success : boolean = false
  errorMsg : string ;
  // For AUTOCOMPLETE
  userControl = new FormControl()
  filteredUsers : Observable<any[]>
  possibleKey : string ;
  constructor(private createProjectService : CreateProjectService,
              private formBuilder : FormBuilder,
              public dialogRef: MatDialogRef<CreateProjectComponent>) { }

  ngOnInit() {
        this.projectForm = this.createForm()
        this.getUsers()

        this.filteredUsers = this.userControl.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterUsers(name) : this.userList.slice())
        );

        // console.log("Generating key  " + this.generateKey("Chicken Biriryani"))
        // console.log("Generating key  " + this.generateKey("William Shakespaere"))
        // console.log("Generating key  " + this.generateKey("Amazing"))
        
  }

  
  filterUsers(name: string): any[] {
    return this.userList.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }



  createForm(){
    let newForm = this.formBuilder.group({
        name  : '',
        projectKey : '',
        description : '',
        type : '',
        projectManager : ''


    });
    return newForm;
  }
   getUsers(){
        this.createProjectService.getUsersFromServer().
            subscribe(
                  (users :any)=>{
                        this.userList = users;
                  }
            )
  }
  sendForm(){
      this.projectForm.patchValue( {"projectManager" : this.userControl.value})
      let data = this.projectForm.getRawValue()
      this.createProjectService.createProject(data).subscribe(
          res=>{
              console.log("  Project Created !!!!!")
              this.success = true
              this.errorMsg =null
          },
          err=>{
                console.log("ERror is  "+JSON.stringify(err.error.text))
                this.errorMsg = err.error.text
              }
      )
  }
  closeDialog(){
    this.dialogRef.close()
}
  generateKey(){
      let input = this.projectForm.get('name').value
      if(input){
        console.log("Input is " + input)
        var text = "";
        var possible = input;
        possible = possible.replace(/\s/g,'');  
        text+=possible[0].toUpperCase()
        for (var i = 0; i < 3; i++)
          text += (possible.charAt(Math.floor(Math.random() * possible.length))).toUpperCase();
      
        this.possibleKey= text;
        this.projectForm.patchValue( { 'projectKey' : text})
      }
            
    }
    
}

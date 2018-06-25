import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CreateProjectService} from './create-project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  projectForm : FormGroup;
  userList : any[]
  
  constructor(private createProjectService : CreateProjectService,
              private formBuilder : FormBuilder) { }

  ngOnInit() {
        this.projectForm = this.createForm()
        this.getUsers()
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
      let data = this.projectForm.getRawValue()
      this.createProjectService.createProject(data).subscribe(
          res=>{
              console.log(res + "  Project Created !!!!!")
          }
      )
  }
}

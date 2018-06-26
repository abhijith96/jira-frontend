import { Component, OnInit } from '@angular/core';

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

  // For AUTOCOMPLETE
  userControl = new FormControl()
  filteredUsers : Observable<any[]>
  
  constructor(private createProjectService : CreateProjectService,
              private formBuilder : FormBuilder) { }

  ngOnInit() {
        this.projectForm = this.createForm()
        this.getUsers()

        this.filteredUsers = this.userControl.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterUsers(name) : this.userList.slice())
        );
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
              console.log(res + "  Project Created !!!!!")
          }
      )
  }
}

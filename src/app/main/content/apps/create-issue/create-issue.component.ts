import { Component, OnInit } from '@angular/core';
import {NewIssueService } from './new-issue.service'
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';




export class User {
      constructor(public name: string) { }
    }

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {

  issueTypes : any[];
  projectList : any[];
  selectedIssueType : any;
  selectedProject : any;
 userList : any[]
  isLinear = false;
  selectedTypeFields : any[];

  issueForm : FormGroup;

  ////For Autocomplete stuff
  projectControl = new FormControl();

  filteredProjects: Observable<any[]>;

  issueTypeControl = new FormControl()
  filteredIssueTypes: Observable<any[]>;
  
  userControlAssignee = new FormControl()
  userControlCreator = new FormControl()
  
  filteredUsersAssignee : Observable<any[]>
  filteredUsersCreator : Observable<any[]>
  
  ///////////////


  constructor(private newIssueService : NewIssueService,
                private formBuilder : FormBuilder) { }

  ngOnInit() {
        this.issueForm =this.createForm()  
        this.getIssueTypes()
        this.getProjects()

      this.filterContainer()
        
  }

  filterContainer(){
      this.filteredProjects = this.projectControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterProjects(name) : this.projectList.slice())
      );
      this.filteredIssueTypes = this.issueTypeControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterIssueTypes(name) : this.issueTypes.slice())
      );
      this.filteredUsersAssignee = this.userControlAssignee.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterUsers(name) : this.userList.slice())
      );
      this.filteredUsersCreator = this.userControlCreator.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterUsers(name) : this.userList.slice())
      );
  }

//AUTOCOMPLETE FILTERS  
  filterProjects(name: string): any[] {
      return this.projectList.filter(option =>
        option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
    
  filterIssueTypes(name: string): any[] {
      return this.issueTypes.filter(option =>
        option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    filterUsers(name: string): any[] {
      return this.userList.filter(option =>
        option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
  
//AUTOCOMPLETE FILTERS  
    displayFn(user?: any): string | undefined {
      return user ? user.name : undefined;
    }


  createForm(){
        let newForm = this.formBuilder.group([]);
        return newForm;
  }
  getSelectedType(){
        console.log("You have selected  project " + JSON.stringify(this.projectControl.value))
        this.selectedProject = this.projectControl.value.pid
        this.selectedIssueType = this.issueTypeControl.value
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
            this.issueForm.patchValue({"projectId" : this.selectedProject })
            // this.issueForm["issueType"] = this.selectedIssueType.name;
            console.log( "Issue Type is "+ JSON.stringify(this.issueForm.getRawValue()) )      
            }
        )
        this.getUsers()
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
      this.issueForm.patchValue( {"assignee" : this.userControlAssignee.value})
      this.issueForm.patchValue( {"createdBy" : this.userControlCreator.value})
      
      let form = this.issueForm.getRawValue();
        form["issueType"]=this.selectedIssueType;
        form["projectId"]=this.selectedProject;
      
        this.newIssueService.saveNewIssue(form).subscribe(
            data=>{
                  console.log("Yaaay Issue Created" + data)
            }
        )
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
  getUsers(){
        this.newIssueService.getUsersFromServer().
            subscribe(
                  (users :any)=>{
                        this.userList = users;
                  }
            )
  }

}
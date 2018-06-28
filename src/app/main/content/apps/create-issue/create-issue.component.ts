import { Component, OnInit } from '@angular/core';
import { NewIssueService } from './new-issue.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';




export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {

  issueTypes: any[];
  projectList: any[];
  selectedIssueType: any;
  selectedProject: any;
  userList: any[]
  isLinear = false;
  selectedTypeFields: any[];
  projectFieldEmpty = false;
  issueForm: FormGroup;
  success : boolean= false;
  ////For Autocomplete stuff
  projectControl = new FormControl();

  filteredProjects: Observable<any[]>;

  issueTypeControl = new FormControl()
  filteredIssueTypes: Observable<any[]>;

  userControlAssignee = new FormControl()
  userControlCreator = new FormControl()

  filteredUsersAssignee: Observable<any[]>
  filteredUsersCreator: Observable<any[]>

  ///////////////


  constructor(private newIssueService: NewIssueService,
    private formBuilder: FormBuilder,
    public dialog :MatDialog,
    public dialogRef: MatDialogRef<CreateIssueComponent>) { }

  ngOnInit() {
    this.issueForm = this.createForm()
    // this.getIssueTypes()
    this.getProjects()

    this.filterContainer()

  }

  filterContainer() {
    this.filteredProjects = this.projectControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterProjects(name) : this.projectList.slice())
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
      option.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterUsers(name: string): any[] {
    return this.userList.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  //AUTOCOMPLETE FILTERS  
  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }
  displayFnType(user : string): string | undefined {
    return user ;
  }


  createForm() {
    let newForm = this.formBuilder.group([]);
    return newForm;
  }
  getSelectedType() {
    if (this.projectControl.value) {
      this.projectFieldEmpty = false;
          console.log("You have selected  project " + JSON.stringify(this.projectControl.value))
          this.selectedProject = this.projectControl.value.pid
          this.selectedIssueType = this.issueTypeControl.value
          console.log("You have selected  " + JSON.stringify(this.selectedIssueType))
          this.newIssueService.getSelectedIssueTypeFields(this.selectedIssueType._id).subscribe(
            (data: any) => {

              this.selectedTypeFields = data[0]["fields"];
              console.log("Required fields are " + JSON.stringify(this.selectedTypeFields))


              this.selectedTypeFields.map((field) => {

                this.issueForm.addControl(field.id, new FormControl())
              })
              //Set value of formcontorl issuetype to value of selected IssueType 
              this.issueForm.patchValue({ "issueType": this.selectedIssueType.name })
              this.issueForm.patchValue({ "projectId": this.selectedProject })
              // this.issueForm["issueType"] = this.selectedIssueType.name;
              console.log("Issue Type is " + JSON.stringify(this.issueForm.getRawValue()))
            }
          )
          this.getUsers()
    }
    else{
          this.projectFieldEmpty = true;
          console.log("Choose project first")
          this.issueTypeControl.patchValue("")
    }
  }

  getProjectSelectedType(){
    this.selectedProject = this.projectControl.value.pid
    this.selectedIssueType = this.issueTypeControl.value
    let data = { pid : this.selectedProject , issueType : this.selectedIssueType }
    console.log("You have selected  " + JSON.stringify(data))
    this.newIssueService.getProjectSelectedIssueTypeFields(data).subscribe(
          res=>{
                  console.log("Got the fields "+   JSON.stringify(res))
                  this.selectedTypeFields = res["fields"];

                  this.selectedTypeFields.map((field) => {

                    this.issueForm.addControl(field.id, new FormControl())
                  })
                  //Set value of formcontorl issuetype to value of selected IssueType 
                  this.issueForm.patchValue({ "issueType": this.selectedIssueType })
                  this.issueForm.patchValue({ "projectId": this.selectedProject })
                  // this.issueForm["issueType"] = this.selectedIssueType.name;
                  console.log("Issue Type is " + JSON.stringify(this.issueForm.getRawValue()))
          }
    )
    this.getUsers()
    
    
  }

  // getIssueTypes() {
  //   this.newIssueService.getIssueTypes().subscribe(
  //     (data: any[]) => {
  //       this.issueTypes = data

  //       console.log()
  //     }
  //   )
  // }
  getProjectIssueTypes(){
    console.log("Getting issue types")
    this.newIssueService.getProjectIssueTypes(this.projectControl.value).subscribe(
        (res:any[])=>{
              console.log("Received fields" + JSON.stringify(res))
              this.issueTypes = res
              this.filteredIssueTypes = this.issueTypeControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterIssueTypes(name) : this.issueTypes.slice())
      );
             
        },
        err=>{
              console.log("Error retrieveing issuetypes")
        }
    )
  }

  sendForm() {
    this.issueForm.patchValue({ "assignee": this.userControlAssignee.value })
    this.issueForm.patchValue({ "createdBy": this.userControlCreator.value })

    let form = this.issueForm.getRawValue();
    form["issueType"] = this.selectedIssueType;
    form["projectId"] = this.selectedProject;

    console.log("Form data is   "+ JSON.stringify(form))
    this.newIssueService.saveNewIssue(form).subscribe(
      data => {
        console.log("Yaaay Issue Created" + data)
        this.success=true
      }
    )
  }
  getProjects() {
    this.newIssueService.getProjectsList().subscribe(
      (data: any[]) => {
        this.projectList = data.map(project => {
          return {
            name: project.name,
            pid: project._id
          };
        });
        console.log("Projects list are  " + this.projectList)
      }
    )
  }
  getUsers() {
    this.newIssueService.getUsersFromServer().
      subscribe(
        (users: any) => {
          this.userList = users;
        }
      )
  }
  closeDialog(){
      this.dialogRef.close()
  }

}

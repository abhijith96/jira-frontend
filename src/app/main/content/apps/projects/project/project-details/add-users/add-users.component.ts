import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from '../../project.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  userList: any[] = [];
  newUsers : any[] =[];
  //For autocomplete stuff
  userControl = new FormControl()
  filteredUsers : Observable<any[]>
  
  
  constructor(private projectService: ProjectService,
    public dialogRef: MatDialogRef<AddUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getUserList()

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



  getUserList() {
    this.projectService.getUsersFromServer(this.data.projectId._id).subscribe(
      (data: any[]) => {
        this.userList = data
        console.log("Receieved user list " + this.userList)
      }
    )
  }
  selectUser(user) {
    console.log("Clicked " + JSON.stringify(user))
    let exists = false
    this.newUsers.forEach(element => {
      console.log("Iterating  " + element._id)
      
                if(element._id === user._id){
                    exists = true;
                }      
        });
      if(!exists){
          this.newUsers.push(user)
      }
      else{
          this.newUsers = this.newUsers.filter(ele=>{
                if(ele._id !== user._id){
                    return ele._id
                }
          })
      }
      console.log("New users are " + this.newUsers)

  }
  addUsers(){
    console.log(JSON.stringify(this.data))
    let data = { users : this.newUsers, id : this.data.projectId._id }
        this.projectService.sendUsersToServer(data).subscribe(
            data=>{
                    console.log("Added users succesfulyy")
            }
        )
  }


}

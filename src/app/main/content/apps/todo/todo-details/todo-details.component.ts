import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  } from '@angular/forms';
import { Router  } from '@angular/router'
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { Location} from '@angular/common';

import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AuthService  } from '../../../auth/auth.service'

@Component({
    selector   : 'fuse-todo-details',
    templateUrl: './todo-details.component.html',
    styleUrls  : ['./todo-details.component.scss'],
    animations : fuseAnimations
})
export class FuseTodoDetailsComponent implements OnInit, OnDestroy
{
    todo: any;
    tags: any[];
    formType: string;
    todoForm: FormGroup;
    userList: any[]
    newCommentText : string
    controlArray = [ ];
    newFieldName : string;
    newFieldValue : string;
    
    currentUser : any;

    nameValid = true;

    comments : any[]

    @ViewChild('titleInput') titleInputField;

    
   
    onFormChange: any;
    onCurrentTodoChanged: Subscription;
    onTagsChanged: Subscription;
    onNewTodoClicked: Subscription;
    
    ///For autocomplete stuff
    userControlAssignee = new FormControl()
    
    filteredUsersAssignee: Observable<any[]>



    constructor(
        private todoService: TodoService,
        private formBuilder: FormBuilder,
        private location : Location,
        private router : Router,
        private authService : AuthService
    )
    {

    }

    ngOnInit(){
            this.authService.currentUser.subscribe(
                  res=>{  this.currentUser = res}
            )
            /*   
                Using promises
                this.todoService.getIssuesFromServer().then(resolve=>{
                                            console.log("Hello  " + JSON.stringify(resolve) )}
                                            ,reject=>{}) 

                Using subscriptions
                    this.todoService.getIssuesFromServer().subscribe(res=>{
                                console.log("Hello ")
                                console.log(JSON.stringify(res))
                                
                                this.controlArray = Object.keys(res).map(data=>{
                                        return [data, res[data] ]
                                })

                        
                    })
            */
            

        // Subscribe to update the current todo
        this.onCurrentTodoChanged =
            this.todoService.onCurrentTodoChanged
                .subscribe(([todo, formType]) => {

                    if ( todo && formType === 'edit' )
                    {
                        this.formType = 'edit';

                        this.getUsers()
                        this.filterContainer()

                        this.todo = todo;
                        // console.log("The todo is   " + JSON.stringify(this.todo, null, " "))
                        this.comments = todo.comments;
                        // console.log("Got comments  " + JSON.stringify(this.comments,null," "))
                        this.todoForm = this.createTodoForm();


                        //Initialize control elements Array
                        let stuff = this.todoForm.value
                        this.controlArray = Object.keys(stuff).map(data=>{
                                return [data, stuff[data]]
                        })
                        // console.log("Control array is   " + this.controlArray)


                        this.onFormChange =
                            this.todoForm.valueChanges.pipe(
                                debounceTime(1000),
                                distinctUntilChanged()
                            ).subscribe(data => {
                                // this.todoService.updateTodo(data);
                                // console.log("Form changed")
                            });
                    }
                });
           
                
        
    }
    filterContainer() {
       
        
        this.filteredUsersAssignee = this.userControlAssignee.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterUsers(name) : this.userList.slice())
        );
       
      }
      filterUsers(name: any): any[] {
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

    ngOnDestroy()
    {
        if ( this.onFormChange )
        {
            this.onFormChange.unsubscribe();
        }
        if(this.onCurrentTodoChanged){
            this.onCurrentTodoChanged.unsubscribe();        
        }
        if(this.onNewTodoClicked){
            this.onNewTodoClicked.unsubscribe();
        }
    }

    changeAssignee(user){
            console.log(JSON.stringify(user,null," "))

            this.todoForm.patchValue({"assignee" :user})
            
            console.log(JSON.stringify(this.todoForm.getRawValue(),null," "))
            
            let stuff = this.todoForm.value
                        this.controlArray = Object.keys(stuff).map(data=>{
                                return [data, stuff[data]]
                        })
    }

    createTodoForm()
    {   
         let controlArray = Object.keys(this.todo).map(data=>{
             return [data, this.todo[data]]
            })
        

        let newForm= this.formBuilder.group({ });
        
        for(var i=0;i<controlArray.length;i++){
             newForm.addControl(controlArray[i][0],  new FormControl(controlArray[i][1])   )
        }
        return newForm
    }

    
  
   
    deleteTodo(){
        console.log("deletingggg   " + JSON.stringify(this.todo.title))
        this.todoService.deleteaTodo(this.todo).subscribe(
                data=>{
                        console.log("Succesfully deleted  Yaaay")
                        this.goBack()
                        
                }
        )
        
        
    }
    goBack(): void {
        console.log("Going back")
         this.location.back();
      }

      isValid(str: any) {
        // console.log(" lalla " + JSON.stringify(str))
        if (typeof str ==="object") {
          return true;
        }
        return false;
    
      }

      saveChanges(){
          let data = this.todoForm.getRawValue()
          if (this.isValid(data["assignee"]) || true) {
            //  console.log("Sending data "+ JSON.stringify(data))
            data.updatedBy = this.currentUser._id
            this.todoService.updateTodoNew(data)
          }
        //   else{
        //     this.nameValid = false;
        //   }
      }
      getUsers() {
        this.todoService.getUsersFromServer().
          subscribe(
            (users: any) => {
              this.userList = users;
            //   console.log("Receiverd users  " + JSON.stringify(this.userList,null," "))
            }
          )
      }

      toggleEmpty(){
        this.nameValid = true;
  }

  writeComment(){
        let newComment :any  = {  }
        newComment.text = this.newCommentText
        newComment.author = this.currentUser
        newComment.issueId = this.todo._id
        this.newCommentText = ""
        // console.log("Comment is  " + JSON.stringify(newComment,null," "))
        this.todoService.sendComment(newComment)
            .subscribe(
                        (res : any)=>{
                                // console.log("Got them comment " , JSON.stringify(res,null," "))
                                this.comments = res
                        },
                        err=>{
                                console.log("Error adding comment")
                        }
            )
  }
  deleteComment(data){
        console.log("Deleting comment ")
        let newData = data
        newData.issueId = this.todo._id
        this.todoService.deleteaComment(newData).
                subscribe( (res : any)=>{
                            console.log("Deleted comment")
                            this.comments = res
                }
            ,err=>{
                    console.log("Error deleting comment")
            })
  }

  

}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  } from '@angular/forms';
import { Router  } from '@angular/router'
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { Location} from '@angular/common';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector   : 'fuse-todo-details',
    templateUrl: './todo-details.component.html',
    styleUrls  : ['./todo-details.component.scss'],
    animations : fuseAnimations
})
export class FuseTodoDetailsComponent implements OnInit, OnDestroy
{
    todo: Todo;
    tags: any[];
    formType: string;
    todoForm: FormGroup;
    userList: any[]
    
    controlArray = [ ];
    newFieldName : string;
    newFieldValue : string;
    
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
        private router : Router
    )
    {

    }

    ngOnInit(){
        this.getUsers()
        this.filterContainer()
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

                        this.todo = todo;
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
                                console.log("Form changed")
                            });
                    }
                });
            /*
                Subscribe to update on tag change
                this.onTagsChanged =
                    this.todoService.onTagsChanged
                        .subscribe(labels => {
                            this.tags = labels;
                        });

                // Subscribe to update on tag change
                this.onNewTodoClicked =
                    this.todoService.onNewTodoClicked
                        .subscribe(() => {
                            this.todo = new Todo({});
                            this.todo.id = FuseUtils.generateGUID();
                            this.formType = 'new';
                            this.todoForm = this.createTodoForm();
                            this.focusTitleField();
                            this.todoService.onCurrentTodoChanged.next([this.todo, 'new']);
                        });
            */
                
        
    }
    filterContainer() {
       
        
        this.filteredUsersAssignee = this.userControlAssignee.valueChanges
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

    focusTitleField()
    {
        setTimeout(() => {
            this.titleInputField.nativeElement.focus();
        });
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

    
    hasTag(tagId)
    {
        return this.todoService.hasTag(tagId, this.todo);
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
        this.router.navigate(['apps/todo-table'])
      }
      saveChanges(){
          let data = this.todoForm.getRawValue()
          console.log("Sending data "+ JSON.stringify(data))
            this.todoService.updateTodoNew(data)
            // .subscribe(
            //     res=>{
            //                 console.log("updated succesfully old ")
            //     }
            // )
      }
      getUsers() {
        this.todoService.getUsersFromServer().
          subscribe(
            (users: any) => {
              this.userList = users;
              console.log("Receiverd users  " + JSON.stringify(users))
            }
          )
      }
}

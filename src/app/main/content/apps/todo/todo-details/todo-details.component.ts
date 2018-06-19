import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

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
    
    controlArray = [ ];
    newFieldName : string;
    newFieldValue : string;
    
    @ViewChild('titleInput') titleInputField;

    
   
    onFormChange: any;
    onCurrentTodoChanged: Subscription;
    onTagsChanged: Subscription;
    onNewTodoClicked: Subscription;
    
    constructor(
        private todoService: TodoService,
        private formBuilder: FormBuilder
    )
    {

    }

    ngOnInit(){
        
        //Using promises
        // this.todoService.getIssuesFromServer().then(resolve=>{
        //                             console.log("Hello  " + JSON.stringify(resolve) )}
        //                             ,reject=>{}) 

        //Using subscriptions
            // this.todoService.getIssuesFromServer().subscribe(res=>{
            //             console.log("Hello ")
            //             console.log(JSON.stringify(res))
                        
            //             this.controlArray = Object.keys(res).map(data=>{
            //                     return [data, res[data] ]
            //             })

                        
            // })

            

        // Subscribe to update the current todo
        this.onCurrentTodoChanged =
            this.todoService.onCurrentTodoChanged
                .subscribe(([todo, formType]) => {

                    if ( todo && formType === 'edit' )
                    {
                        this.formType = 'edit';

                        this.todo = todo;
                        console.log("ellooo")
                        this.todoForm = this.createTodoForm();


                        //Initialize control elements Array
                        let stuff = this.todoForm.value
                        this.controlArray = Object.keys(stuff).map(data=>{
                                return [data, stuff[data]]
                        })


                        this.onFormChange =
                            this.todoForm.valueChanges.pipe(
                                debounceTime(500),
                                distinctUntilChanged()
                            ).subscribe(data => {
                                this.todoService.updateTodo(data);
                            });
                    }
                });

        // Subscribe to update on tag change
        // this.onTagsChanged =
        //     this.todoService.onTagsChanged
        //         .subscribe(labels => {
        //             this.tags = labels;
        //         });

        // // Subscribe to update on tag change
        // this.onNewTodoClicked =
        //     this.todoService.onNewTodoClicked
        //         .subscribe(() => {
        //             this.todo = new Todo({});
        //             this.todo.id = FuseUtils.generateGUID();
        //             this.formType = 'new';
        //             this.todoForm = this.createTodoForm();
        //             this.focusTitleField();
        //             this.todoService.onCurrentTodoChanged.next([this.todo, 'new']);
        //         });

                
        
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
        

            // console.log(controlArray)
        let newForm= this.formBuilder.group({ });
        
        for(var i=0;i<controlArray.length;i++){
             newForm.addControl(controlArray[i][0],  new FormControl(controlArray[i][1])   )
             console.log(i)
        }
        return newForm
    }

    toggleStar(event)
    {
        event.stopPropagation();
        this.todo.toggleStar();
        this.todoService.updateTodo(this.todo);
    }

    toggleImportant(event)
    {
        event.stopPropagation();
        this.todo.toggleImportant();
        this.todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Completed
     * @param event
     */
    toggleCompleted(event)
    {
        event.stopPropagation();
        this.todo.toggleCompleted();
        this.todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Deleted
     * @param event
     */
    toggleDeleted(event)
    {
        event.stopPropagation();
        this.todo.toggleDeleted();
        this.todoService.updateTodo(this.todo);
    }

    toggleTagOnTodo(tagId)
    {
        this.todoService.toggleTagOnTodo(tagId, this.todo);
    }

    hasTag(tagId)
    {
        return this.todoService.hasTag(tagId, this.todo);
    }

    addTodo()
    {
        this.todoService.updateTodo(this.todoForm.getRawValue());
    }
    
    addFields(){
         this.todoForm.addControl(this.newFieldName, new FormControl(this.newFieldValue));
         console.log("Stuff i'm saving is  " + this.todoForm.value)
         this.todoService.updateTodo(this.todoForm.getRawValue());
         
         this.newFieldName=""
         this.newFieldValue=""
         
         let stuff = this.todoForm.value
         this.controlArray = Object.keys(stuff).map(data=>{
                return [data, stuff[data]]
         })
         console.log(this.controlArray)
         
          
    }
}

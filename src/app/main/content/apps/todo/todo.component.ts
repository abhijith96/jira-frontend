import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common'
import { fuseAnimations } from '@fuse/animations';

import { TodoService } from './todo.service';

@Component({
    selector   : 'fuse-todo',
    templateUrl: './todo.component.html',
    styleUrls  : ['./todo.component.scss'],
    animations : fuseAnimations
})
export class FuseTodoComponent implements OnInit, OnDestroy
{
    hasSelectedTodos: boolean;
    isIndeterminate: boolean;
    filters: any[];
    tags: any[];
    searchInput: FormControl;
    currentTodo: any;

    onSelectedTodosChanged: Subscription;
    onFiltersChanged: Subscription;
    onTagsChanged: Subscription;
    onCurrentTodoChanged: Subscription;

    constructor(private todoService: TodoService,
                private router : Router,
                    private location : Location)
    {
        this.searchInput = new FormControl('');
    }

    ngOnInit()
    {
        this.onSelectedTodosChanged =
            this.todoService.onSelectedTodosChanged
                .subscribe(selectedTodos => {

                    setTimeout(() => {
                        this.hasSelectedTodos = selectedTodos.length > 0;
                        this.isIndeterminate = (selectedTodos.length !== this.todoService.todos.length && selectedTodos.length > 0);
                    }, 0);
                });

        // this.onFiltersChanged =
        //     this.todoService.onFiltersChanged
        //         .subscribe(folders => {
        //             this.filters = this.todoService.filters;
        //         });

        // this.onTagsChanged =
        //     this.todoService.onTagsChanged
        //         .subscribe(tags => {
        //             this.tags = this.todoService.tags;
        //         });

        // this.searchInput.valueChanges.pipe(
        //     debounceTime(300),
        //     distinctUntilChanged()
        // ).subscribe(searchText => {
        //     this.todoService.onSearchTextChanged.next(searchText);
        // });

        this.onCurrentTodoChanged =
            this.todoService.onCurrentTodoChanged
                .subscribe(([currentTodo, formType]) => {
                    if ( !currentTodo )
                    {
                        this.currentTodo = null;
                    }
                    else
                    {
                        this.currentTodo = currentTodo;
                    }
                });
    }

    ngOnDestroy()
    {
        if(this.onSelectedTodosChanged){
            this.onSelectedTodosChanged.unsubscribe();
            
        }
        
        if(this.onFiltersChanged){
            this.onFiltersChanged.unsubscribe();
        }   
        if(this.onTagsChanged){
            this.onTagsChanged.unsubscribe();
        }
        if(this.onCurrentTodoChanged){
            this.onCurrentTodoChanged.unsubscribe();
            
        }
    }

    deSelectCurrentTodo()
    {
        this.todoService.onCurrentTodoChanged.next([null, null]);
    }

    // toggleSelectAll()
    // {
    //     this.todoService.toggleSelectAll();
    // }

    selectTodos(filterParameter?, filterValue?)
    {
        this.todoService.selectTodos(filterParameter, filterValue);
    }

    deselectTodos()
    {
        this.todoService.deselectTodos();
    }

     
 
  goBack(): void {
    console.log("Going back")
     this.location.back();
     
  }

    // toggleTagOnSelectedTodos(tagId)
    // {
    //     this.todoService.toggleTagOnSelectedTodos(tagId);
    // }
}

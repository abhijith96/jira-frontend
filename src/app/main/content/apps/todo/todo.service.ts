import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FuseUtils }  from '@fuse/utils';

import {_baseUrl } from '../apiCall';

@Injectable({
    providedIn: 'root'
  })
export class TodoService implements Resolve<any>
{   
    
    private _baseUrl = _baseUrl; 

    stuffFromBackend = []

    todos: any[];
    selectedTodos: any[];
    currentTodo;
    searchText = '';

    filters: any[];
    tags: any[];
    routeParams: any;

    onTodosChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSelectedTodosChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onCurrentTodoChanged: BehaviorSubject<any> = new BehaviorSubject([]);

    onFiltersChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onTagsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSearchTextChanged: BehaviorSubject<any> = new BehaviorSubject('');
    onNewTodoClicked: Subject<any> = new Subject();

    constructor(
        private http: HttpClient,
        private location: Location, // Set current todo
        private router : Router
    )
    {
        this.selectedTodos = [];
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;
        console.log(this.routeParams)
        return new Promise((resolve, reject) => {

            Promise.all([
                // this.getFilters(),
                // this.getTags(),
                this.getTodos()
            ]).then(
                () => {
                    if ( this.routeParams.todoId )
                    {
                        this.setCurrentTodo(this.routeParams.todoId);
                    }
                    else
                    {
                        this.setCurrentTodo(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getTodos();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getTodos();
                        }
                    });
                    resolve();
                },
                reject
            );
        });
    }

  
  
    getTodos(): Promise<any[]>
    {

        return this.getTodosByParams(this.routeParams);
    }

    /**
     * Get todos by params
     * @param handle
     * @returns {Promise<Todo[]>}
     */
    //You can get the todos hereee
    getTodosByParams(handle): Promise<any[]>
    {
        return new Promise((resolve, reject) => {
            //This is hwere the magic hapens
            this.http.get(this._baseUrl + 'issues2')
                .subscribe((todos: any) => {
                    // console.log("Todos are " + todos)
                    if(todos !== "empty document"){
                        this.todos = todos.map(todo => {
                       
                        return (todo);
                    });
                }
                    else{
                            this.todos=[]
                    }

                    this.todos = FuseUtils.filterArrayByString(this.todos, this.searchText);

                    this.onTodosChanged.next(this.todos);

                    resolve(this.todos);
                });
        });
    }

   
    

    

    /**
     * Toggle selected todo by id
     * @param id
     */
    toggleSelectedTodo(id)
    {
        // First, check if we already have that todo as selected...
        if ( this.selectedTodos.length > 0 )
        {
            for ( const todo of this.selectedTodos )
            {
                // ...delete the selected todo
                if ( todo.id === id )
                {
                    const index = this.selectedTodos.indexOf(todo);

                    if ( index !== -1 )
                    {
                        this.selectedTodos.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedTodosChanged.next(this.selectedTodos);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedTodos.push(
            this.todos.find(todo => {
                return todo.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll()
    {
        if ( this.selectedTodos.length > 0 )
        {
            this.deselectTodos();
        }
        else
        {
            this.selectTodos();
        }

    }

    selectTodos(filterParameter?, filterValue?)
    {
        this.selectedTodos = [];

        // If there is no filter, select all todos
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedTodos = this.todos;
        }
        else
        {
            this.selectedTodos.push(...
                this.todos.filter(todo => {
                    return todo[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }

    deselectTodos()
    {
        this.selectedTodos = [];

        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }

    /**
     * Set current todo by id
     * @param id
     */
    setCurrentTodo(id)
    {
        this.currentTodo = this.todos.find(todo => {
            return todo._id === id;
        });

        this.onCurrentTodoChanged.next([this.currentTodo, 'edit']);

        const tagHandle    = this.routeParams.tagHandle,
              filterHandle = this.routeParams.filterHandle;

        if ( tagHandle )
        {
            this.location.go('apps/todo/tag/' + tagHandle + '/' + id);
        }
        else if ( filterHandle )
        {
            this.location.go('apps/todo/filter/' + filterHandle + '/' + id);
        }
        else
        {
            this.location.go('apps/todo/all/' + id);
        }
    }

    



    hasTag(tagId, todo)
    {
        if ( !todo.tags )
        {
            return false;
        }

        return todo.tags.indexOf(tagId) !== -1;
    }



    updateTodoNew(todo){
            // return this.http.post(this._baseUrl+  'edit/issue' , todo)
            return new Promise((resolve,reject) =>{
                    this.http.post(this._baseUrl+  'edit/issue' , todo)
                        .subscribe(res=>{
                                this.getTodos().then(
                                    todos=>{
                                            resolve(todos)
                                    },reject
                                )
                        })
            })
    }

 
    
    deleteaTodo(id){
            this.getTodos()
            return this.http.post(_baseUrl + 'issue/delete',id)
            
    }
    getUsersFromServer(){
        return this.http.get(_baseUrl + 'users')
      }

      sendComment(comment){
            return this.http.post(_baseUrl + 'issue/comments',comment)
      }
   deleteaComment(data){
       console.log("Deleting  "  +JSON.stringify(data, null, " "))
            return this.http.post(_baseUrl + 'issue/comments/delete' , data)
   }

   getMyTodos(data){
       console.log("data is   " + JSON.stringify(data))
        return this.http.post(_baseUrl + 'issues/myissues',data)
   }
}

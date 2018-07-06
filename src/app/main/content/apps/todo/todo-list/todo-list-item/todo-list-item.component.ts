import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import { Todo } from '../../todo.model';
import { TodoService } from '../../todo.service';
import { Location } from '@angular/common'
@Component({
    selector     : 'fuse-todo-list-item',
    templateUrl  : './todo-list-item.component.html',
    styleUrls    : ['./todo-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseTodoListItemComponent implements OnInit, OnDestroy
{
    @Input() todo;
    tags: any[];
    @HostBinding('class.selected') selected: boolean;
    @HostBinding('class.completed') completed: boolean;
    @HostBinding('class.move-disabled') moveDisabled: boolean;

    onSelectedTodosChanged: Subscription;
    onTagsChanged: Subscription;

    constructor(
        private todoService: TodoService,
        private route: ActivatedRoute,
        private router : Router,
        private location : Location
    )
    {
        // Disable move if path is not /all
        if ( route.snapshot.url[0].path !== 'all' )
        {
            this.moveDisabled = true;
        }
    }

    ngOnInit()
    {
        // Set the initial values
        this.todo = (this.todo);
        
        this.completed = this.todo.completed;

        // Subscribe to update on selected todo change
        this.onSelectedTodosChanged =
            this.todoService.onSelectedTodosChanged
                .subscribe(selectedTodos => {
                    this.selected = false;

                    if ( selectedTodos.length > 0 )
                    {
                        for ( const todo of selectedTodos )
                        {
                            if ( todo.id === this.todo.id )
                            {
                                this.selected = true;
                                break;
                            }
                        }
                    }
                });

        // Subscribe to update on tag change
        this.onTagsChanged =
            this.todoService.onTagsChanged
                .subscribe(tags => {
                    this.tags = tags;
                });
    }

    ngOnDestroy()
    {
        this.onSelectedTodosChanged.unsubscribe();
    }

    onSelectedChange()
    {
        this.todoService.toggleSelectedTodo(this.todo.id);
    }

    deleteTodo(){
        console.log("deletingggg   " + JSON.stringify(this.todo.title))
        this.todoService.deleteaTodo(this.todo).subscribe(
                data=>{
                        console.log("Succesfully deleted  Yaaay")
                        
                }
        )
        this.refresh()
    }
    readTodo(todoId)
    {
        // Set current todo
        this.todoService.setCurrentTodo(todoId);
    }
    refresh(): void {
        console.log("Refreshing!")
        // this.router.navigateByUrl('/apps/issuetypes', { skipLocationChange: true });
        // this.router.navigate(ProjectsComponent);
        this.router.navigateByUrl('', {skipLocationChange: true}).then(()=>
        this.router.navigate(["apps/todo/all"]));
      }
      
  goBack(): void {
    console.log("Going back")
     this.location.back();
     
  }
    /**
     * Toggle star
     */
    // toggleStar(event)
    // {
    //     event.stopPropagation();

    //     this.todo.toggleStar();
    //     this.todoService.updateTodo(this.todo);
    // }

    /**
     * Toggle Important
     */
    // toggleImportant(event)
    // {
    //     event.stopPropagation();

    //     this.todo.toggleImportant();
    //     this.todoService.updateTodo(this.todo);
    // }

    /**
     * Toggle Completed
     */
    // toggleCompleted(event)
    // {
    //     event.stopPropagation();

    //     this.todo.toggleCompleted();
    //     this.todoService.updateTodo(this.todo);
    // }
}

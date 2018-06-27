import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {

  
  constructor(private router : Router) { }

  ngOnInit() {
  }
  refresh(): void {
    console.log("Refreshing!")
    // this.router.navigateByUrl('/apps/issuetypes', { skipLocationChange: true });
    // this.router.navigate(ProjectsComponent);
    this.router.navigateByUrl('apps/issuetypes', {skipLocationChange: true}).then(()=>
    this.router.navigate(["apps/todo-table"]));
  }

}

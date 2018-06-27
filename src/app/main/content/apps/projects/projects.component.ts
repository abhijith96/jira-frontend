import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { Router } from '@angular/router'
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private peopleArray : any[];
  constructor(private location : Location,
              private router : Router) { }

  ngOnInit() {
  } 
  refresh(): void {
    console.log("Refreshing!")
    // this.router.navigateByUrl('/apps/issuetypes', { skipLocationChange: true });
    // this.router.navigate(ProjectsComponent);
    this.router.navigateByUrl('apps/issuetypes', {skipLocationChange: true}).then(()=>
    this.router.navigate(["apps/projects"]));
  }
}

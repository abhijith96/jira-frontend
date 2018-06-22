import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';
import { ProjectService } from './project.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  currentProject : any;

  constructor(private route : ActivatedRoute,
              private projectService : ProjectService,
              private location : Location) { }


  ngOnInit() {
        this.route.params.subscribe(param=> {this.getProjectById(param)})
  }

  getProjectById(data){
            this.projectService.getProjectByIdFromServer(data).subscribe(
                (data :any )=>{
                          this.currentProject = data;
                          console.log("Current Project is " + JSON.stringify(this.currentProject))
                          console.log("Name is " + this.currentProject["name"] )
                }
            )
  }

  goBack(): void {
    this.location.back();
  }
}

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
          //  this.projectService.getProjectByIdFromServer(data)
          //  this.projectService.selectedProjectObservable.subscribe(
          //    data=>{
          //             this.currentProject = data
          //    }
          //  )
          this.projectService.getProjectByIdFromServer(data).subscribe(
              data=>{
                    this.currentProject = data;
              }
          )
            
  }

  goBack(): void {
    this.location.back();
  }
  deleteProject(){
      
      this.projectService.deleteaProject(this.currentProject._id).subscribe(
          data=>{
              console.log("Yaaay Project DELETED!!!")
              this.goBack()
          }
      )
  }
}

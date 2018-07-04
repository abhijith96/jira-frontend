import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'
import {LogService } from '../logs.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  currentLogId ; 
  currentLog : any;
  
  constructor( private route : ActivatedRoute, public location : Location, 
                private logService : LogService, private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(param=> {this.getLogById(param)})
    
  }
  getLogById(data){
        this.currentLogId = data.id
        // console.log("Log id is   "+ JSON.stringify(data))
        this.logService.getLog(data).subscribe(
            (res : any)=>{
                  this.currentLog = res;
                  // console.log("curren tLog is  "+ JSON.stringify(this.currentLog))
            }
            ,err=>{
                  console.log("Error Getting Log Details")
            }
        )
      
  }
  goBack(): void {
    this.location.back();
  }

  revertLog(){
          let data = this.currentLogId
          this.logService.revertLogById(data).subscribe(
              res=>{
                    console.log("Yay Revertion success")
              },
              err=>[
                  console.log("Revertion Failed")
              ]
          )
  }

  goTo(link){
      this.router.navigate([link])
  }

  
}

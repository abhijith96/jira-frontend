import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  
  constructor(private router : Router) { }

  ngOnInit() {
  }



  
  refresh(): void {
    console.log("Refreshing!")
    // this.router.navigateByUrl('/apps/issuetypes', { skipLocationChange: true });
    // this.router.navigate(ProjectsComponent);
    this.router.navigateByUrl('apps/issuetypes', {skipLocationChange: true}).then(()=>
    this.router.navigate(["apps/log"]));
  }
}

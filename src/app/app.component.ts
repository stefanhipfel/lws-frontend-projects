import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter } from 'events';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Lens Wide Shut - Projects';
  private busyIndicatorDisabled = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    const self = this;
    this.projectService.busyIndicator.subscribe(active => {
      setTimeout( () => {
        self.busyIndicatorDisabled = !active;
      });
    });
  }

}

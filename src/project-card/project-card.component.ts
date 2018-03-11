import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: [ './project-card.component.css' ]
})
export class ProjectCardComponent {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

}

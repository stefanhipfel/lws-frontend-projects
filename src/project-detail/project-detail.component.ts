import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList, SimpleChanges } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ './project-detail.component.css' ]
})
export class ProjectDetailComponent implements OnInit {
    @Input() project: Project = <Project>{};
    @ViewChild('galleryContainer') galleryContainer: ElementRef;
    @ViewChildren('imageElement') imageElements: QueryList<any>;

    private images: any[] = [];
    private gallery: any[] = [];

    constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer
    ) { }

  async ngOnInit() {
    this.projectService.busyIndicator.next(true);
    this.getProject();
  }

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => {
        this.projectService.busyIndicator.next(false);
        this.project = project;
      });
  }

  goBack(): void {
    this.location.back();
  }

  getBackground (image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
}

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnChanges(changes: SimpleChanges) {
    // input params changed
    console.log(changes);
  }
}

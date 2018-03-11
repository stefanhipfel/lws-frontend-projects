import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule , MatGridListModule,
   MatListModule } from '@angular/material';

import { ProjectCardComponent } from '../project-card/project-card.component';



@NgModule({
  declarations: [
    ProjectCardComponent
  ],
  imports: [
    ProjectCardComponent
  ],
  providers: []
})
export class Dasboard { }

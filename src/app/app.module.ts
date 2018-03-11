import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule , MatGridListModule,
   MatListModule, MatProgressSpinnerModule} from '@angular/material';

import * as angularGrid from 'angulargrid';

import { AppComponent } from './app.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectService } from '../project.service';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectCardComponent,
    ProjectDetailComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

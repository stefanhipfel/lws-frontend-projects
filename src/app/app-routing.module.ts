import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects/', pathMatch: 'full' },
  { path: 'projects', redirectTo: '/projects/', pathMatch: 'full' },
  { path: 'projects/', component: DashboardComponent },
  { path: 'projects/detail/:id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

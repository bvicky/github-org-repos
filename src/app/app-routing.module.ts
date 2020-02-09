import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {RepositoryComponent} from './repository/repository.component';
import {ErrorComponent} from './error/error.component';
import {CommitsComponent} from './commits/commits.component';


const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'repos', component: RepositoryComponent},
  {path: 'commits', component: CommitsComponent},
  {path: 'error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

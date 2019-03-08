import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchJobComponent } from './SearchJobContainer/search-job/search-job.component';
const routes: Routes = [
  { path: 'search-job', component: SearchJobComponent },
]
 @NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
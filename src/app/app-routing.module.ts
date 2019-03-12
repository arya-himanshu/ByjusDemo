import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSearchContainerComponent } from './JobSearch/job-search-container/job-search-container.component';
const routes: Routes = [
  { path: 'search-job', component: JobSearchContainerComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
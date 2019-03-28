import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSearchContainerComponent } from './JobSearch/job-search-container/job-search-container.component';
import { MultiSelectComponent } from './MultipleSearchSelect/multi-select/multi-select.component';
const routes: Routes = [
  { path: 'search-job', component: JobSearchContainerComponent },
  { path: 'multiselect', component: MultiSelectComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
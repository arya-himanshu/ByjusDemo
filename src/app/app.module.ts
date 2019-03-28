import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JobSearchContainerComponent } from './JobSearch/job-search-container/job-search-container.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from './MultipleSearchSelect/multi-select/multi-select.component';
import * as faker from 'faker';
import { ClickOutSideDirective } from './click-out-side.directive'

@NgModule({
  declarations: [
    AppComponent,
    JobSearchContainerComponent,
    MultiSelectComponent,
    ClickOutSideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

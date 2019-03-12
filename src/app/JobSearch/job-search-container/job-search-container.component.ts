import { Component, OnInit } from '@angular/core';
import { JobSearchService } from '../services/job-search.service';
import { Jobsfeed } from '../job-search-pojo/Jobsfeed';
import { SearchObject } from '../job-search-pojo/SearchObject';

@Component({
  selector: 'app-job-search-container',
  templateUrl: './job-search-container.component.html',
  styleUrls: ['./job-search-container.component.css'],
  providers: [JobSearchService]
})
export class JobSearchContainerComponent implements OnInit {
  jobs: Array<Jobsfeed> = new Array;
  locations = new Map<String, String>();
  experience = new Map<String, String>();
  skill: string;
  searchObj = new SearchObject();
  filterJobs = new Map<String, Jobsfeed>();
  constructor(private jobSearchService: JobSearchService) { }

  ngOnInit() {
    this.getJobs()
  }
  getJobs() {
    this.jobSearchService.getJobsFeed()
      .subscribe(jobsResponse => this.fetchJobs(jobsResponse));
  }
  fetchJobs(response) {
    if (response != undefined)
      this.jobs = response.jobsfeed;
    this.experience.set("--Select Experience--", "Select Experience");
    this.locations.set("--Select Location--", "Select Location");
    for (let j of this.jobs) {
      this.experiencemanipulation(j);
      this.locationmanipulation(j)
    }
  }
  experiencemanipulation(response) {
    if (response.experience != undefined && response.experience.length > 0) {
      this.experience.set(response.experience, response.experience);
    }
  }
  locationmanipulation(response) {
    if (response.location != undefined && response.location.length > 0) {
      this.locations.set(response.location, response.location);
    }

  }
  searchSkill() {
    this.filterJobs = new Map<String, Jobsfeed>()
    for (let jb of this.jobs) {
      if (this.searchObj.experience != undefined && this.searchObj.experience.length > 0) {
        if (jb.experience === this.searchObj.experience) {
          this.filterJobs.set(jb._id, jb)
        }
      }
      if (this.searchObj.location != undefined && this.searchObj.location.length > 0) {
        if (jb.location === this.searchObj.location) {
          this.filterJobs.set(jb._id, jb);
        }
      }
      if (this.searchObj.skill != undefined && this.searchObj.skill.length >= 2) {
        if (jb.skills.match(this.searchObj.skill)) {
          this.filterJobs.set(jb._id, jb);
        }
      }
    }
    console.log(this.filterJobs)
  }

}

import { Component, OnInit } from '@angular/core';
import { JobSearchService } from '../services/job-search.service';
import { Jobsfeed } from '../job-search-pojo/Jobsfeed';
import { SearchObject } from '../job-search-pojo/SearchObject';
import { Observable } from 'rxjs';

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
  items = [1, 3, 3, 3, 3, 32, 12, 9, 4, 42, 54, 53, 423, 33, 3];
  paginate

  constructor(private jobSearchService: JobSearchService) { }

  ngOnInit() {
    this.pagination()
    // this.getJobs()
  }

  pagination() {

    let length = this.items.length;
    console.log("length " + length);

    if (length % 5 == 0) {
      console.log("if");
      console.log(length / 5)
      this.paginate = length / 5
    } else {
      console.log("else");
      console.log(length / 5);
      this.paginate = length / 5;
    }
  }















  /** This bit make http call to get response of jobs **/
  getJobs() {
    this.jobSearchService.getJobsFeed()
      .subscribe(jobsResponse => this.fetchJobs(jobsResponse));
  }

  /**  fetchJobs , experiencemanipulation
   *  and locationmanipulation function setting 
   * select box value 
   */
  fetchJobs(response) {
    if (response != undefined)
      this.jobs = response.jobsfeed;
    this.experience.set("--Select Experience--", "Select Experience");
    this.locations.set("--Select Location--", "Select Location");
    for (let j of this.jobs) {
      this.setMap(j)
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

  // this bit filters the Response accordind to user interface
  searchSkill($event) {
    console.log($event)
    this.filterJobs = new Map<String, Jobsfeed>();
    for (let jb of $event) {
      if (this.searchObj.experience != undefined && this.searchObj.experience.length > 0) {
        if (jb.experience === this.searchObj.experience) {
          this.setMap(jb)
        }
      }
      if (this.searchObj.location != undefined && this.searchObj.location.length > 0) {
        if (jb.location === this.searchObj.location) {
          this.setMap(jb)
        }
      }
      if (this.searchObj.skill != undefined && this.searchObj.skill.length >= 2) {
        if (jb.skills.match(this.searchObj.skill)) {
          this.setMap(jb)
        }
      }
    }
  }


  setMap(response) {
    this.filterJobs.set(response._id, response)
  }

  // experience sorting
  sortExperience(filterJobs) {
    let localJobsFeed: Array<Jobsfeed> = new Array;
    filterJobs.forEach((value: any, key: string) => {
      localJobsFeed.push(value)
    });
    let localArray = []
    this.filterJobs = new Map<String, Jobsfeed>();
    localArray = this.getSortedExpResponse(localJobsFeed)
    for (let j of localArray) {
      this.setMap(j)
    }
  }

  // location sorting
  sortLocation(filterJobs) {
    let localJobsFeed: Array<Jobsfeed> = new Array;
    filterJobs.forEach((value: any, key: string) => {
      localJobsFeed.push(value)
    });
    let localArray = [];
    this.getSortedLocationResponse(localJobsFeed)
      .subscribe(jobsResponse => localArray = jobsResponse);
    this.filterJobs = new Map<String, Jobsfeed>();
    console.log(localArray)
    for (let j of localArray) {
      this.setMap(j)
    }
    console.log(this.filterJobs)
  }

  // location sorting
  getSortedLocationResponse(response): Observable<Jobsfeed[]> {
    response.sort((a, b) => {
      if (a.location < b.location) return -1;
      else if (a.location > b.location) return 1;
      else return 0;
    })
    return response
  }

  // experience sorting
  getSortedExpResponse(response) {
    response.sort((a, b) => {
      if (a.experience < b.experience) return -1;
      else if (a.experience > b.experience) return 1;
      else return 0;
    })
    return response
  }

}

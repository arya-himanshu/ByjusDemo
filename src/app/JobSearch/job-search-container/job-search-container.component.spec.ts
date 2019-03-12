import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchContainerComponent } from './job-search-container.component';

describe('JobSearchContainerComponent', () => {
  let component: JobSearchContainerComponent;
  let fixture: ComponentFixture<JobSearchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSearchContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

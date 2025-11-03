import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplyingComponent } from './job-applying.component';

describe('JobApplyingComponent', () => {
  let component: JobApplyingComponent;
  let fixture: ComponentFixture<JobApplyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplyingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

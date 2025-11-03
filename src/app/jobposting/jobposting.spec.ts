import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jobposting } from './jobposting';

describe('Jobposting', () => {
  let component: Jobposting;
  let fixture: ComponentFixture<Jobposting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jobposting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jobposting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

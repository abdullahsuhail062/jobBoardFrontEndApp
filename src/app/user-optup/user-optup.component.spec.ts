import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptupComponent } from './user-optup.component';

describe('UserOptupComponent', () => {
  let component: UserOptupComponent;
  let fixture: ComponentFixture<UserOptupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOptupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOptupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

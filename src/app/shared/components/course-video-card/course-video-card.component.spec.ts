import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseVideoCardComponent } from './course-video-card.component';

describe('CourseVideoCardComponent', () => {
  let component: CourseVideoCardComponent;
  let fixture: ComponentFixture<CourseVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseVideoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

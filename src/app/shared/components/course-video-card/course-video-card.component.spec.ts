import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseVideoCardComponent } from './course-video-card.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('CourseVideoCardComponent', () => {
  let component: CourseVideoCardComponent;
  let fixture: ComponentFixture<CourseVideoCardComponent>;
  let store: MockStore;

  const initialState = { loggedIn: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseVideoCardComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseVideoCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

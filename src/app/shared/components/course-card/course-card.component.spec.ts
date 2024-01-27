import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponent } from './course-card.component';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Course } from '../../../app.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let store: MockStore;
  let utilService: UtilService;
  let router: Router;

  const initialState = {
    course: {
      courseId: '0f12bd31-944d-40fb-a6ff-c71fbcf3bd53',
      courseName: 'Swift Programming for iOS',
      courseImageUrl: 'https://picsum.photos/id/8/300/200',
      author: 'Emma Johnson',
      actualPrice: 1099,
      discountPercentage: 17,
      discountedPrice: 1099 - (17 / 100) * 1099,
      tags: ['iOS', 'Swift'],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    utilService = TestBed.inject(UtilService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

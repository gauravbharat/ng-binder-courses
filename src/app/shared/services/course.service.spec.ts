import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('CourseService', () => {
  let service: CourseService;

  let store: MockStore;
  const initialState = { loggedIn: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(CourseService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../app.model';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { CourseVideoCardComponent } from '../../shared/components/course-video-card/course-video-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    RouterModule,
    CourseVideoCardComponent,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  #activatedRoute = inject(ActivatedRoute);

  #subscriptions = new Subscription();

  isLoadingCourse: WritableSignal<boolean> = signal(true);
  courseDetail: WritableSignal<Course | undefined> = signal(undefined);

  ngOnInit(): void {
    this.#subscriptions.add(
      this.#activatedRoute.data.subscribe(({ courseDetails }) => {
        if (courseDetails) {
          this.isLoadingCourse.set(false);
          this.courseDetail.set(courseDetails);
        }

        // console.log(
        //   'CourseDetailsComponent : course',
        //   courseDetails,
        //   'this.isLoadingCourse',
        //   this.isLoadingCourse()
        // );
      })
    );
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}

import { Component, WritableSignal, signal } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-course-video-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './course-video-card.component.html',
  styleUrl: './course-video-card.component.css',
})
export class CourseVideoCardComponent extends CourseCardComponent {
  remainingHours: WritableSignal<number> = signal(0);
  remainingMinutes: WritableSignal<number> = signal(0);
  remainingSeconds: WritableSignal<number> = signal(0);
  timerCompleted: WritableSignal<boolean> = signal(true);

  override ngOnInit(): void {
    super.ngOnInit();

    // console.log('CourseVideoCardComponent', this.course);

    if (this.course.discountPercentage > 0) {
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);

      this.timerCompleted.set(false);
      // console.log('CourseVideoCardComponent : nextDate', nextDate.toString());

      this.subscriptions.add(
        timer(0, 1000)
          .pipe(takeWhile(() => nextDate.getTime() > new Date().getTime()))
          .subscribe({
            next: () => {
              const timerEndsMilliSecs =
                nextDate.getTime() - new Date().getTime();

              this.remainingHours.set(
                Math.floor(
                  (timerEndsMilliSecs % (1000 * 60 * 60 * 24)) /
                    (1000 * 60 * 60)
                )
              );
              this.remainingMinutes.set(
                Math.floor(
                  (timerEndsMilliSecs % (1000 * 60 * 60)) / (1000 * 60)
                )
              );
              this.remainingSeconds.set(
                Math.floor((timerEndsMilliSecs % (1000 * 60)) / 1000)
              );
            },
            complete: () => {
              this.remainingHours.set(0);
              this.remainingMinutes.set(0);
              this.remainingSeconds.set(0);

              this.timerCompleted.set(true);
            },
          })
      );
    }
  }
}

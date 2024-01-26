import { Component } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-course-video-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './course-video-card.component.html',
  styleUrl: './course-video-card.component.css',
})
export class CourseVideoCardComponent extends CourseCardComponent {
  override ngOnInit(): void {
    super.ngOnInit();

    console.log('CourseVideoCardComponent', this.course);
  }
}

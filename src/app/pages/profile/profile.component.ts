import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/user.selectors';
import { ButtonComponent } from '../../shared/components/button/button.component';
import {
  Expertise,
  Position,
  User,
  UserUpdateData,
  WorkExperience,
} from '../../app.model';
import { Subscription, take } from 'rxjs';
import { FormInputComponent } from '../../shared/components/form/form-input/form-input.component';
import { FileInputComponent } from '../../shared/components/form/file-input/file-input.component';
import { UserActions } from '../../state/user.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BannerComponent,
    ButtonComponent,
    FormInputComponent,
    FileInputComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  #subscriptions = new Subscription();

  #userFromStore!: User | undefined;

  readonly position = Position;
  readonly expertise = Expertise;
  readonly workExperience = WorkExperience;
  readonly areasOfInterestOptions = [
    'Web development',
    'Data science',
    'Mobile app development',
    'Game development',
    'Cloud computing',
    'Artificial intelligence (AI)',
    'Cybersecurity',
    'Embedded systems',
  ];

  readonly positionOptions = [
    { displayName: 'Student', value: Position.student },
    { displayName: 'Professional', value: Position.professional },
  ];

  readonly expertiseOptions = [
    { displayName: 'Backend', value: Expertise.BACKEND },
    { displayName: 'Frontend', value: Expertise.FRONTEND },
    { displayName: 'Fullstack', value: Expertise.FULLSTACK },
  ];

  readonly experienceOptions = [
    { displayName: '0 - 5', value: WorkExperience.ZeroToFive },
    { displayName: '5 - 10', value: WorkExperience.FiveToTen },
    { displayName: '10 & above', value: WorkExperience.TenAndAbove },
  ];

  userForm = new FormGroup({
    email: new FormControl<string | undefined>(undefined, [
      Validators.required,
      Validators.maxLength(100),
    ]),
    displayName: new FormControl<string | undefined>(undefined, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    firstName: new FormControl<string | undefined>(undefined, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    gender: new FormControl<string | undefined>(undefined),
    image: new FormControl<string | ArrayBuffer | null | undefined>(undefined),
    lastName: new FormControl<string | undefined>(undefined, [
      Validators.maxLength(50),
    ]),
    username: new FormControl<string | undefined>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    about: new FormControl<string | undefined>(undefined, [
      Validators.maxLength(100),
    ]),
    areasOfInterest: new FormControl<string[]>([]),
    position: new FormControl<Position | undefined>(undefined),
    experience: new FormControl<WorkExperience | undefined>(undefined),
    expertise: new FormControl<Expertise | undefined>(undefined),
    role: new FormControl<string | undefined>(undefined, [
      Validators.maxLength(200),
    ]),
  });

  ngOnInit(): void {
    this.#store
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.#userFromStore = user;

        this.userForm.patchValue({
          email: user?.email,
          displayName: user?.displayName,
          firstName: user?.firstName,
          gender: user?.gender,
          image: user?.image,
          lastName: user?.lastName,
          username: user?.username,
          about: user?.about,
          areasOfInterest: user?.areasOfInterest ?? [],
          position: user?.position,
          experience: user?.experience,
          expertise: user?.expertise,
          role: user?.role,
        });

        // console.log(
        //   '#userFromStore',
        //   this.#userFromStore,
        //   'userForm',
        //   this.userForm.value
        // );
      });
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

  setImageUrl(url: string | ArrayBuffer | null | undefined): void {
    this.userForm.get('image')?.setValue(url);
  }

  setAreaOfInterest(interest: string, add: boolean): void {
    const areasOfInterest = this.userForm.get('areasOfInterest');

    let currentInterests = areasOfInterest?.value || [];

    if (add) {
      currentInterests.push(interest);
    } else {
      currentInterests = currentInterests.filter((v) => v !== interest);
    }

    areasOfInterest?.setValue(currentInterests);
  }

  removeImage(): void {
    this.userForm.get('image')?.setValue(undefined);
  }

  interestPresent(interest: string): boolean {
    const areasOfInterest = this.userForm.get('areasOfInterest')?.value || [];

    return areasOfInterest.some((v) => v === interest);
  }

  onChangePosition(): void {
    const position = this.userForm.get('position')?.value;

    if (position === Position.student) {
      this.userForm.get('experience')?.setValue(undefined);
      this.userForm.get('expertise')?.setValue(undefined);
    }
  }

  onSave(): void {
    console.log('userform', this.userForm);

    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();

      return;
    }

    if (this.#userFromStore) {
      this.#store.dispatch(
        UserActions.updateUserStart({
          userId: this.#userFromStore.id,
          userData: this.userForm.value as UserUpdateData,
        })
      );
    }
  }
}

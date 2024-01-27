import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
})
export class FormInputComponent {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() displayName!: string;
  @Input() errorCondition = 'required'; //can be refactored to string array to handle multiple conditions
  @Input() type = 'text';
  @Input() largerInput = false;
  @Input() rows = 2;
}

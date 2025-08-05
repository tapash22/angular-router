import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'app-user-info-form',
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  templateUrl: './user-info-form.component.html',
  styleUrl: './user-info-form.component.css',
})
export class UserInfoFormComponent {
  @Input() profileForm!: FormGroup;
}

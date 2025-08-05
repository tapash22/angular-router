import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-array-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-array-input.component.html',
  styleUrl: './form-array-input.component.css',
})
export class FormArrayInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() arrayName!: string;
  @Input() label!: string;

  get formArray(): FormArray {
    return this.formGroup.get(this.arrayName) as FormArray;
  }
}

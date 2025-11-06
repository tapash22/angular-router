import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'app-project-score-form',
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  templateUrl: './project-score-form.component.html',
  styleUrl: './project-score-form.component.css',
})
export class ProjectScoreFormComponent {
  @Input() projectResource!: FormGroup;
}

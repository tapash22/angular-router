import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-score-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-score-form.component.html',
  styleUrl: './project-score-form.component.css'
})
export class ProjectScoreFormComponent {
  @Input() projectScore!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();

  get workingResourceScores(): FormArray {
    return this.projectScore.get('working_resource_scores') as FormArray;
  }

  onSubmit() {
    this.formSubmitted.emit();
  }

}

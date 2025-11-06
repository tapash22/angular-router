import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormArrayInputComponent } from '../form-array-input/form-array-input.component';

@Component({
  selector: 'app-project-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    FormArrayInputComponent,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent {
  @Input() project!: FormGroup;

  @Output() projectRequirement = new EventEmitter<void>();
  @Output() projectWorkingResource = new EventEmitter<void>();

  // Get working_resource FormArray from the passed form
  get working_resource(): FormArray {
    return this.project.get('working_resource') as FormArray;
  }

  // Get project_requirement FormArray from the passed form
  get project_requirement(): FormArray {
    return this.project.get('project_requirement') as FormArray;
  }
  addRequirement() {
    this.projectRequirement.emit();
  }

  addWorkingResource() {
    this.projectWorkingResource.emit();
  }
}

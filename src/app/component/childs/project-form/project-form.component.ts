import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent {
  @Input() project!: FormGroup;

  @Output() projectRequirement = new EventEmitter<void>();
  @Output() projectWorkingResource = new EventEmitter<void>();

  addRequirement() {
    this.projectRequirement.emit();
  }

  addWorkingResource() {
    this.projectWorkingResource.emit();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogComponent } from '../dialog/dynamic-dialog/dynamic-dialog.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-dialog-form',
  imports: [ReactiveFormsModule, DynamicDialogComponent, CommonModule],
  templateUrl: './dynamic-dialog-form.component.html',
  styleUrl: './dynamic-dialog-form.component.css',
})
export class DynamicDialogFormComponent {
  @Input() form!: FormGroup;
  @Input() formTitle = '';
  @Input() submitBtnTitle = 'Submit';
  @Input() size: 'tiny' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'md';
  @Input() color = 'bg-blue-500';

  @Input() show = false;
  @Input() showFooter = true;

  @Output() closeView = new EventEmitter<void>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() formSubmit = new EventEmitter<any>();

  // Called on footer button click
  submitForm(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.closeView.emit();
  }
}

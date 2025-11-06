import { Component, Input } from '@angular/core';
import { DynamicDialogComponent } from '../../component/dialog/dynamic-dialog/dynamic-dialog.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChildLayoutComponent } from '../../layout/child-layout/child-layout.component';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../interfaces/user';
import { ToasterService } from '../../service/toaster.service';

@Component({
  selector: 'app-performance',
  imports: [
    DynamicDialogComponent,
    CommonModule,
    ReactiveFormsModule,
    ChildLayoutComponent,
  ],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css',
})
export class PerformanceComponent {
  showDialog = false;
  submitBtnTitle = 'Click';
  color = 'bg-gray-200';
  editIndex?: number;

  @Input() form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toaster: ToasterService,
  ) {
    this.form = this.fb.group({
      project_title: ['', Validators.required],
      project_subtitle: [''],
      project_project_length: [null],
      project_estimated_date: [''],
    });
  }

  dialogFormOpen() {
    this.showDialog = true;
    console.log('open form');
  }

  closeDialog() {
    this.showDialog = false;
  }

  dialogAction() {
    if (this.form.invalid) return;
    const formValue = this.form.value;

    this.projectService
      .updateOrAddProject(formValue, this.editIndex)
      .subscribe({
        next: () => {
          console.log('Project saved successfully');
          this.showDialog = false;
          this.editIndex = undefined;
        },
        error: (err) => {
          console.error('Failed to save project:', err);
          this.toaster?.showToast?.('Failed to save project', 'error');
        },
      });
  }
}

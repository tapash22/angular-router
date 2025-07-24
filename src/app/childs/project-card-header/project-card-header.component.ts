import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBarChart,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-card-header',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './project-card-header.component.html',
  styleUrl: './project-card-header.component.css',
})
export class ProjectCardHeaderComponent {
  @Input() project!: Project;
  @Input() icon?: any;
  @Input() isDisabled: boolean = false;

  iconBarChart = faBarChart;
  iconDelete = faTrash;

  @Output() clickToOpen = new EventEmitter();
  @Output() clickToEdit = new EventEmitter();
  @Output() clickToDelete = new EventEmitter();

  handleEditProject($event: any) {
    this.clickToEdit.emit($event);
  }
  openProjectChart() {
    this.clickToOpen.emit();
  }
  projectDelete() {
    this.clickToDelete.emit();
  }
}

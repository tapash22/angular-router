import { Component, Input } from '@angular/core';
import { DynamicChipComponent } from '../dynamic-chip/dynamic-chip.component';
import { Project } from '../../interfaces/user';

@Component({
  selector: 'app-project-card-body',
  imports: [DynamicChipComponent],
  templateUrl: './project-card-body.component.html',
  styleUrl: './project-card-body.component.css',
})
export class ProjectCardBodyComponent {
  @Input() project!: Project;
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProjecctResources } from '../../interfaces/user';
import { DynamicProgressBarComponent } from '../dynamic-progress-bar/dynamic-progress-bar.component';

@Component({
  selector: 'app-project-work-resource',
  imports: [CommonModule,DynamicProgressBarComponent],
  templateUrl: './project-work-resource.component.html',
  styleUrl: './project-work-resource.component.css'
})
export class ProjectWorkResourceComponent {
  @Input() projectResources !: ProjecctResources

}

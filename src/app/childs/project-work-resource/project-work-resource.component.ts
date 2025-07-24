import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjecctResources } from '../../interfaces/user';
import { DynamicProgressBarComponent } from '../dynamic-progress-bar/dynamic-progress-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-work-resource',
  imports: [CommonModule, DynamicProgressBarComponent, FontAwesomeModule],
  templateUrl: './project-work-resource.component.html',
  styleUrl: './project-work-resource.component.css',
})
export class ProjectWorkResourceComponent {
  @Input() projectResources!: ProjecctResources;
  @Input() icon?: IconDefinition;

  @Output() resourceUpdate = new EventEmitter();


  handleProjectResounce($event: any) {
    this.resourceUpdate.emit($event)
  }
}

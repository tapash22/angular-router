import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// using for pass icon and using
// import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dynamic-section-card-read-field',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dynamic-section-card-read-field.component.html',
  styleUrl: './dynamic-section-card-read-field.component.css',
})
export class DynamicSectionCardReadFieldComponent {
  @Input() userInfoList: [string, string | number][] = [];
  
}

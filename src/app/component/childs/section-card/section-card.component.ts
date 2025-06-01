import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-section-card',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.css'
})
export class SectionCardComponent {
  @Input() title!: string;
  @Input() icon?: any;
}

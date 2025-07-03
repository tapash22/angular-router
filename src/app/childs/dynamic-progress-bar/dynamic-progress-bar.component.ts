import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-progress-bar',
  imports: [CommonModule],
  templateUrl: './dynamic-progress-bar.component.html',
  styleUrl: './dynamic-progress-bar.component.css',
})
export class DynamicProgressBarComponent {
  // pass value from parents
  @Input() progressBarTitle!: string;
  @Input() score: number | null | undefined = 0;
  @Input() striped: boolean = false;
}

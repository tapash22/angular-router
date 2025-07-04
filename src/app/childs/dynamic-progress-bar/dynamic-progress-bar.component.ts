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
  @Input() height: 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  get progressbarHeight(): string {
    switch (this.height) {
      case 'sm':
        return 'h-2';
      case 'md':
        return 'h-3 ';
      case 'lg':
        return 'h-5 ';
      case 'xl':
        return 'h-7';
      default:
        return 'h-2';
    }
  }
}

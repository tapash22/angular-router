import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-chip',
  imports: [CommonModule],
  templateUrl: './dynamic-chip.component.html',
  styleUrl: './dynamic-chip.component.css',
})
export class DynamicChipComponent {
  @Input() chipList!: string[];
}

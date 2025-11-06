import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  imports: [CommonModule],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css',
})
export class UserItemComponent {
  @Input() title = '';
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-list-item',
  imports: [CommonModule],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.css',
})
export class UserListItemComponent {
  @Input() user!: User;
  @Input() index!: number;
  @Input() selected = false;
  @Output() userSelected = new EventEmitter<{ index: number; user: User }>();

  selectUser() {
    this.userSelected.emit({ index: this.index, user: this.user });
  }
}

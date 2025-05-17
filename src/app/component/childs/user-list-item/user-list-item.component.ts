import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../../../interfaces/user";

@Component({
  selector: "app-user-list-item",
  imports: [CommonModule],
  templateUrl: "./user-list-item.component.html",
  styleUrl: "./user-list-item.component.css",
})
export class UserListItemComponent {
  @Input() user!: User;
  @Input() index!: number;
  @Input() selected: boolean = false; 
  @Output() userSelected = new EventEmitter<typeof this.user>();

    selectUser() {
    this.userSelected.emit(this.user);
  }
}

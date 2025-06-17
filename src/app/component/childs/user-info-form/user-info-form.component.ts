import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-info-form.component.html',
  styleUrl: './user-info-form.component.css'
})
export class UserInfoFormComponent {
  
  @Input() profileForm!: FormGroup;
  @Output() update = new EventEmitter<void>();

  onUpdate() {
    this.update.emit();
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dynamic-dialog',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.css',
})
export class DynamicDialogComponent {
  @Input() title!: string;
  @Input() size: 'tiny' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'sm';
  @Input() show = false;
  @Input() disableClose = false;
  @Input() showFooter = false;
  @Input() submitBtnTitle!: string;
  @Output() onClose = new EventEmitter<void>();

  // icon
  iconClose = faTimes;

  get dialogWidth(): string {
    switch (this.size) {
      case 'tiny':
        return 'w-[10%]';
      case 'sm':
        return 'w-[20%] ';
      case 'md':
        return 'w-[30%] ';
      case 'lg':
        return 'w-[40%]  ';
      case 'xl':
        return 'w-[60%]';
      case 'xxl':
        return 'w-[70%]';
      default:
        return 'w-[30%]';
    }
  }

  closeDialog() {
    if (!this.disableClose) {
      this.onClose.emit();
    }
  }
}

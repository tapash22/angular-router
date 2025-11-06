import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dynamic-dialog',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.css',
  animations: [
    trigger('backdropAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
    ]),

    trigger('dialogAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }), // start from bottom offscreen
        animate(
          '300ms cubic-bezier(0.25, 1, 0.5, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '250ms ease-in',
          style({ opacity: 0, transform: 'translateY(100%)' }),
        ), // slide back down
      ]),
    ]),
  ],
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

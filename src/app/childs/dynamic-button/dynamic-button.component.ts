import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-dynamic-button',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dynamic-button.component.html',
  styleUrl: './dynamic-button.component.css',
})
export class DynamicButtonComponent {
  // button property pass by parents
  @Input() mode: 'square' | 'rounded' | 'submit' = 'square';
  @Input() size: 'tiny' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'sm';
  @Input() shadow?: 'default' | 'card' | 'button';
  @Input() buttonRounded: 'sm' | 'lg' | 'xl' | '2xl' | 'full' = 'lg';
  @Input() icon!: IconDefinition;
  @Input() buttonText?: string = '';

  @Input() isDarkMode?: boolean = false;

  @Output() buttonClick = new EventEmitter<void>();

  @ViewChild('btn', { static: true })
  private buttonRef!: ElementRef<HTMLButtonElement>;

  handleClick() {
    this.buttonClick.emit();
  }

  get buttonSizeClass(): string {
    switch (this.size) {
      case 'tiny':
        return this.mode === 'submit' ? 'h-6 px-3' : 'w-6 h-6';
      case 'sm':
        return this.mode === 'submit' ? 'h-8 px-4' : 'w-8 h-8';
      case 'md':
        return this.mode === 'submit' ? 'h-10 px-5' : 'w-10 h-10';
      case 'lg':
        return this.mode === 'submit' ? 'h-12 px-6' : 'w-12 h-12';
      case 'xl':
        return this.mode === 'submit' ? 'h-14 px-7' : 'w-14 h-14';
      case 'xxl':
        return this.mode === 'submit' ? 'h-16 px-8' : 'w-16 h-16';
      default:
        return this.mode === 'submit' ? 'h-8 px-4' : 'w-8 h-8';
    }
  }

  get roundedClass(): string {
    return this.mode === 'rounded'
      ? 'rounded-full'
      : `rounded-${this.buttonRounded}`;
  }

  get backgroundColor(): string {
    return this.isDarkMode ? 'bg-[var(--surface-dark)]' : 'bg-[var(--surface)]';
  }

  get textColor(): string {
    return this.isDarkMode ? 'text-[var(--demo-dark)]' : 'text-[var(--demo)]';
  }

  get boxShadow(): string {
    switch (this.shadow) {
      case 'button':
        return 'shadow-[var(--shadow-button)]';
      case 'card':
        return 'shadow-[var(--shadow-card)]';
      default:
        return 'shadow-[var(--shadow-default)]';
    }
  }

  public getNativeElement(): HTMLElement {
    return this.buttonRef.nativeElement;
  }
}

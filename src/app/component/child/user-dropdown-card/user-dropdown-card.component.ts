import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { User } from '../../../interfaces/user';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faArrowRightToBracket,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dropdown-card',
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './user-dropdown-card.component.html',
  styleUrl: './user-dropdown-card.component.css',
})
export class UserDropdownCardComponent {
  userProfileData!: User;

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<void>();

  // icons
  iconProfile = faUser;
  iconLogout = faArrowRightToBracket;
  iconResetPassword = faKey;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private userService: UserService,
  ) {
    this.userProfileData = userService.getCurrentUser()!;
  }

  closeDropdown() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
  logoutUser() {
    this.closeDropdown();
    this.logout.emit();
  }

  // Improved hover methods with Renderer2 for Angular-safe DOM manipulation
  hoverItem(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();

    this.renderer.setStyle(
      element,
      'background',
      `linear-gradient(90deg, transparent 0%, ${primaryColor}20 50%, transparent 100%)`,
    );
  }

  unhoverItem(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();

    this.renderer.setStyle(
      element,
      'background',
      `linear-gradient(90deg, transparent 0%, ${primaryColor}10 50%, transparent 100%)`,
    );
  }

  // Alternative method using CSS classes instead of direct style manipulation
  /*
  hoverItem(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    this.renderer.addClass(element, 'hover-active');
  }

  unhoverItem(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    this.renderer.removeClass(element, 'hover-active');
  }
  */
}

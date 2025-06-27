import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faBars,
  faUser,
  faArrowRightToBracket,
  faKey,
  faClose,
  faUserTimes
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { User } from '../../interfaces/user';
import { UserService } from '../../service/user.service';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { ThemeService } from '../../service/core/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FontAwesomeModule, RouterLink, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  iconBell = faBell;
  iconBars = faBars;
  iconClose = faClose;
  iconProfile = faUser;
  iconLogout = faArrowRightToBracket;
  iconResetPassword = faKey;
  iconUserClick = faUserTimes

  userProfileData!: User;
  show: boolean = false;
  lastSegment: string = '';
  pathSegments: string[] = [];
  pathWithSlashes: string = '';

  @Input() showSidebar!: boolean;
  @ViewChild('trigger') trigger!: ElementRef;

  @Output() onClose = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private renderer: Renderer2,
     public themeService: ThemeService 

  ) {
    //use service current user
    this.userProfileData = userService.getCurrentUser()!;
    // Listen for route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.pathSegments = url.split('/').filter(Boolean);
        this.pathWithSlashes = this.pathSegments.join(' / ');
      });
  }

  closeNavigattion() {
    console.log('clibk');
    this.onClose.emit();
  }

  logoutUser() {
    // Call the logout method to clear the data
    this.authService.logout();
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
      `linear-gradient(90deg, transparent 0%, ${primaryColor}20 50%, transparent 100%)`
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
      `linear-gradient(90deg, transparent 0%, ${primaryColor}10 50%, transparent 100%)`
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.trigger?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.show = false;
    }
  }
}

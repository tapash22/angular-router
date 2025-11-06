import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faBars,
  faUser,
  faArrowRightToBracket,
  faKey,
  faClose,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { ThemeService } from '../../service/core/theme.service';
import { UserDropdownCardComponent } from '../child/user-dropdown-card/user-dropdown-card.component';
import { DynamicButtonComponent } from '../../childs/dynamic-button/dynamic-button.component';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    FontAwesomeModule,
    ThemeToggleComponent,
    UserDropdownCardComponent,
    DynamicButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  iconBell = faBell;
  iconBars = faBars;
  iccloseView = faClose;
  iconProfile = faUser;
  iconLogout = faArrowRightToBracket;
  iconResetPassword = faKey;
  iconUserClick = faUserShield;

  show = false;
  lastSegment = '';
  pathSegments: string[] = [];
  pathWithSlashes = '';

  @Input() showSidebar!: boolean;
  // @ViewChild('trigger') trigger!: ElementRef;
  // @ViewChild('btn', { static: true }) private buttonRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('trigger') triggerButton!: DynamicButtonComponent;

  @Output() closeView = new EventEmitter<void>();

  private router = inject(Router)
  private authService = inject(AuthService)
  private themeService = inject(ThemeService)

  constructor(
  ) {
    // Listen for route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.pathSegments = url.split('/').filter(Boolean);
        this.pathWithSlashes = this.pathSegments.join(' / ');
      });
  }

  showUserMenu() {
    this.show = !this.show;
  }

  closeNavigattion() {
    this.closeView.emit();
  }

  logoutUser() {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const buttonEl = this.triggerButton?.getNativeElement();
    if (buttonEl && !buttonEl.contains(event.target as Node)) {
      // Click was outside
      this.show = false;
    }
  }
}

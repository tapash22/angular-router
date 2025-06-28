import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
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
  faUserShield
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { UserService } from '../../service/user.service';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { ThemeService } from '../../service/core/theme.service';
import { UserDropdownCardComponent } from '../child/user-dropdown-card/user-dropdown-card.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FontAwesomeModule, ThemeToggleComponent, UserDropdownCardComponent],
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
  iconUserClick = faUserShield;

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
    public themeService: ThemeService
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

  closeNavigattion() {
    console.log('clibk');
    this.onClose.emit();
  }

  logoutUser() {
    // Call the logout method to clear the data
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.trigger?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.show = false;
    }
  }
}

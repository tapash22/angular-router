import { Component, Input } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUserNinja,
  faUserSecret,
  faUserShield,
  faUserCircle,
  faSignalPerfect,
  faNetworkWired,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { UserService } from '../../service/user.service';
import { MenuListComponent } from '../../childs/menu-list/menu-list.component';

@Component({
  selector: 'app-navigation',
  imports: [ CommonModule, FontAwesomeModule,MenuListComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  // boolean value for expand or close
  @Input() collapsed = false;

  // icon import and after decclear use into component
  iconAdmin = faUserNinja;
  iconManager = faUserShield;
  iconOfficer = faUserSecret;
  iconEmployee = faUserCircle;
  iconPerformance = faSignalPerfect;
  iconWork = faNetworkWired;

  // using for which link are active
  activeLink: string = 'admin';

  // decclear permission wish page for different user depend on role
  menuItems = [
    { id: 2, name: 'admin', link: 'admin', icon: this.iconAdmin },
    { id: 3, name: 'manager', link: 'manager', icon: this.iconManager },
    { id: 4, name: 'officer', link: 'officer', icon: this.iconOfficer },
    { id: 5, name: 'employee', link: 'employee', icon: this.iconEmployee },
    {
      id: 6,
      name: 'performance',
      link: 'performance',
      icon: this.iconPerformance,
    },
    { id: 7, name: 'work', link: 'work', icon: this.iconWork },
  ];

  constructor(private router: Router, private userService: UserService) {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     this.activeLink = event.urlAfterRedirects.split('?')[0].split('#')[0];
    //   });
  }

  // Reuse service logic
  hasAccess(link: string): boolean {
    return this.userService.hasAccessTo(link);
  }

  // pre-filter the items
  get visibleMenuItems() {
    return this.menuItems.filter((item) => this.hasAccess(item.link));
  }
  
}

import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from '../../component/header/header.component';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NavigationComponent, RouterOutlet, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  usersData: User[] = [];
  showSidebar = true;
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private userService = inject(UserService)
  constructor(
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.activatedRoute.firstChild;
        // Drill down in case you have nested children
        while (currentRoute?.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
      });
  }

  ngOnInit(): void {
    this.usersData = this.userService.getAllUsers();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}

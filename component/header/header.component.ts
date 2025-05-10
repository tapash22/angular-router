import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faHome } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { User } from '../../interfaces/user';



@Component({
  selector: 'app-header',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  iconBell = faBell;
  iconHome = faHome
  lastSegment:string = ''
  pathSegments:string[] = []

  constructor(private router: Router, private authService: AuthService ) {}

  // ngOnInit() {
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
  //     const url = event.urlAfterRedirects; // safer than router.url
  //     const segments = url.split('/').filter(Boolean); // removes empty strings
  //     this.lastSegment = segments.length > 0 ? segments[segments.length - 1] : '';
  //   });
  // }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;  // e.g., '/admin/user'
      this.pathSegments = url.split('/').filter(Boolean);  // ['admin', 'user']
    });
  }

  logoutUser() {
    // Check if currentUser exists in localStorage
    const userDataBeforeLogout = localStorage.getItem("currentUser");
    console.log("Before logout:", userDataBeforeLogout ? JSON.parse(userDataBeforeLogout) : null);
  
    // Call the logout method to clear the data
    this.authService.logout();
  
    // After logout, check if the data is removed
    const userDataAfterLogout = localStorage.getItem("currentUser");
    console.log("After logout:", userDataAfterLogout ? JSON.parse(userDataAfterLogout) : null);
  }
  
}

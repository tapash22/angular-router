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
export class HeaderComponent  {
  iconBell = faBell;
  iconHome = faHome
  newPath:string = ''

  constructor(private router: Router, private authService: AuthService ) {}



ngOnInit() {
  // 1. Get the current route on first load
  const currentUrl = this.router.url;
  this.updateNewPath(currentUrl);

  // 2. Listen to route changes after that
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe((event: NavigationEnd) => {
    this.updateNewPath(event.urlAfterRedirects);
  });
}

  updateNewPath(url: string) {
  const pathSegments = url.split('/').filter(Boolean);
  this.newPath = pathSegments.map(segment => '/' + segment).join('');
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

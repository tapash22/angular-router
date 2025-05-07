import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faHome } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';



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

  constructor(private router: Router) {}

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
}

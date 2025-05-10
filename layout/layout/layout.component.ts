<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { HeaderComponent } from '../../component/header/header.component';
// import { AuthService } from '../../service/auth/auth.service';
import { filter } from 'rxjs';
=======
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { HeaderComponent } from '../../component/header/header.component';
import { filter } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
>>>>>>> main-page
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
<<<<<<< HEAD
  imports: [RouterOutlet, NavigationComponent, HeaderComponent, CommonModule],
=======
  imports: [RouterOutlet, CommonModule],
>>>>>>> main-page
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  showSidebar = true;
<<<<<<< HEAD

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
=======
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
           this.router.events
>>>>>>> main-page
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.activatedRoute.firstChild;
        // Drill down in case you have nested children
        while (currentRoute?.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
<<<<<<< HEAD
        const hideSidebar = currentRoute?.snapshot.data['hideSidebar'];
=======
        const hideSidebar = currentRoute?.snapshot.data["hideSidebar"];
        // console.log(hideSidebar)
>>>>>>> main-page
        this.showSidebar = !hideSidebar;
      });
  }
}

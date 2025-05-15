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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavigationComponent, HeaderComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  showSidebar = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.activatedRoute.firstChild;
        // Drill down in case you have nested children
        while (currentRoute?.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        const hideSidebar = currentRoute?.snapshot.data['hideSidebar'];
        this.showSidebar = !hideSidebar;
      });
  }
}

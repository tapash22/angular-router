import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  showSidebar = true;

      private router = inject(Router)
      private activatedRoute = inject(ActivatedRoute)
      private authService = inject(AuthService)
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
        const hideSidebar = currentRoute?.snapshot.data['hideSidebar'];
        // console.log(hideSidebar)
        this.showSidebar = !hideSidebar;
      });
  }
}

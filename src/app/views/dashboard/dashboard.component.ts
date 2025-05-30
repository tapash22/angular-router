import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth/auth.service";
import { User } from "../../interfaces/user";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "../../layout/layout/layout.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";
import { HeaderComponent } from "../../component/header/header.component";
import { NavigationComponent } from "../../component/navigation/navigation.component";

@Component({
  selector: "app-dashboard",
  imports: [CommonModule, NavigationComponent, RouterOutlet, HeaderComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  usersData: User[] = [];
  showSidebar = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
           this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.activatedRoute.firstChild;
        // Drill down in case you have nested children
        while (currentRoute?.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        const hideSidebar = currentRoute?.snapshot.data["hideSidebar"];
        // this.showSidebar = !hideSidebar;
      });
  }

  ngOnInit(): void {
    this.usersData = this.authService.getAllUsers();
  
  }

    toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}

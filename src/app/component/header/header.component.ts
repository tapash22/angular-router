import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { AuthService } from "../../service/auth/auth.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBell, faHome } from "@fortawesome/free-solid-svg-icons";
import { filter } from "rxjs";
import { User } from "../../interfaces/user";

@Component({
  selector: "app-header",
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  iconBell = faBell;
  iconHome = faHome;
  userProfileData!: User;
  show: boolean = false;
  lastSegment: string = "";
  pathSegments: string[] = [];

  @ViewChild("trigger") trigger!: ElementRef;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userProfileData = this.authService.getCurrentUser()!;
    console.log(this.userProfileData.projects)
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd) ?? null)
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects; // e.g., '/admin/user'
        this.pathSegments = url.split("/").filter(Boolean); // ['admin', 'user']
      });
  }

  logoutUser() {
    // Call the logout method to clear the data
    this.authService.logout();
  }

  @HostListener("document:click", ["$event"])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.trigger?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.show = false;
    }
  }
}

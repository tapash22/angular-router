import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { AuthService } from "../../service/auth/auth.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faBell,
  faHome,
  faUser,
  faArrowRightToBracket,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { filter } from "rxjs";
import { User } from "../../interfaces/user";

@Component({
  selector: "app-header",
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  iconBell = faBell;
  iconHome = faHome;
  iconProfile = faUser;
  iconLogout = faArrowRightToBracket;
  iconResetPassword = faKey;

  userProfileData!: User;
  show: boolean = false;
  lastSegment: string = "";
  pathSegments: string[] = [];
  pathWithSlashes: string = "";

  @ViewChild("trigger") trigger!: ElementRef;

  @Output() onClose = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {
    //use service current user
    this.userProfileData = authService.getCurrentUser()!;
    // Listen for route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.pathSegments = url.split("/").filter(Boolean);
        this.pathWithSlashes = this.pathSegments.join(" / ");
      });
  }

  closeNavigattion(){
    console.log("clibk")
    this.onClose.emit();
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

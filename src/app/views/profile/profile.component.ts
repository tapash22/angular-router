import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth/auth.service";
import { Project, User } from "../../interfaces/user";
import { ProjectCardComponent } from "../../component/childs/project-card/project-card.component";
import { CommonModule } from "@angular/common";
import {
  faUser,
  faUserGear,
  faMapLocation,
  faMailBulk,
  faMobilePhone,
  faEdit,
  faCircleDot
} from "@fortawesome/free-solid-svg-icons";
import { filter } from "rxjs";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SectionCardComponent } from "../../component/childs/section-card/section-card.component";

type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: "app-profile",
  imports: [ProjectCardComponent, CommonModule,FontAwesomeModule,SectionCardComponent],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  userProfileData!: User;
  selectedIndex: number | null = null;
  activeSection: string = "basic";

  solidStar = solidStar;
  halfStar = faStarHalfAlt;

  iconUser = faUser;
  iconUserRole = faUserGear;
  iconMail = faMailBulk;
  iconPhone = faMobilePhone;
  iconLocation = faMapLocation;
  iconEdit = faEdit;
  iconCircle = faCircleDot;

   ratingStars: StarType[] = [];

  menuItems: any[] = [
    { id: "basic", label: "Basic Info" },
    { id: "projects", label: "Projects" },
    { id: "performance", label: "Performance" },
  ];

  scrollToSection(id: string) {
    this.activeSection = id;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  constructor(private authService: AuthService) {
    this.userProfileData = this.authService.getCurrentUser()!;
    this.generateStars(this.userProfileData.rating !)
  }

  
  private generateStars(rating: number): void {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    this.ratingStars = [
      ...Array<StarType>(full).fill('full'),
      ...Array<StarType>(half).fill('half'),
      ...Array<StarType>(empty).fill('empty'),
    ];
  }

  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }
}

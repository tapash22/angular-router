import { Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faUserNinja,
  faUserSecret,
  faUserShield,
  faUserCircle,
  faSignalPerfect,
  faNetworkWired
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-navigation",
  imports: [RouterLink, RouterLinkActive, CommonModule,FontAwesomeModule],
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.css",
})
export class NavigationComponent {
  @Input() collapsed = false;

  iconAdmin = faUserNinja;
  iconManager = faUserShield;
  iconOfficer= faUserSecret;
  iconEmployee = faUserCircle ;
  iconPerformance = faSignalPerfect;
  iconWork = faNetworkWired;

  menuItems: any[] = [
    { id: 2, name: "admin", link: "admin",icon: this.iconAdmin },
    { id: 3, name: "manager", link: "manager",icon: this.iconManager },
    { id: 4, name: "officer", link: "officer",icon: this.iconOfficer },
    { id: 5, name: "employee", link: "employee",icon: this.iconEmployee },
    { id: 6, name: "performance", link: "performance",icon: this.iconPerformance },
    { id: 7, name: "work", link: "work",icon: this.iconWork },
  ];
}

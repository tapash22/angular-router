import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Project, User } from "../../interfaces/user";
import { MOCK_USERS, projects } from "../../localStore/user-data";

@Component({
  selector: "app-admin",
  imports: [CommonModule],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.css",
})
export class AdminComponent {
  projectList: Project[] = projects;
  userList:User[]= MOCK_USERS
}

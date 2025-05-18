import { Component } from "@angular/core";
import { MOCK_USERS } from "../../localStore/user-data";
import { OverviewChartComponent } from "../../component/chart/overview-chart/overview-chart.component";
import { ChartType, ChartData, ChartConfiguration } from "chart.js";
import { UserListItemComponent } from "../../component/childs/user-list-item/user-list-item.component";
import { ProjectCardComponent } from "../../component/childs/project-card/project-card.component";
import { CommonModule } from "@angular/common";
import { Project, User } from "../../interfaces/user";

@Component({
  selector: "app-officer",
  imports: [
    CommonModule,
    OverviewChartComponent,
    UserListItemComponent,
    ProjectCardComponent,
  ],
  templateUrl: "./officer.component.html",
  styleUrl: "./officer.component.css",
})
export class OfficerComponent {
  // projectList: Project[] = projects;
  userList: User[] = MOCK_USERS;

  selectedIndex: number | null = null;

  chartType: ChartType = "line";

  chartData: ChartData = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Quater Overview",
        data: [10, 25, 20],
        fill: false,
        tension: 0.4,
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66,165,245,0.2)",
      },
    ],
  };

  chartOptions: ChartConfiguration["options"] = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  filterUserAsOfficer: User[] = this.userList.filter(
    (user) => user.role === "user"
  );

  projectList:Project [] | null = this.userList.flatMap(user => user.projects ?? [])

  handleUserSelection(event: { index: number; user: User }) {
    this.selectedIndex = event.index;
  }

  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }
}

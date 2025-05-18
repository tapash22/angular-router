import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Project, User } from "../../interfaces/user";
import { MOCK_USERS, projects } from "../../localStore/user-data";
import { OverviewChartComponent } from "../../component/chart/overview-chart/overview-chart.component";
import { ChartType, ChartData, ChartConfiguration } from "chart.js";
import { UserListItemComponent } from "../../component/childs/user-list-item/user-list-item.component";
import { ProjectCardComponent } from "../../component/childs/project-card/project-card.component";

@Component({
  selector: "app-manager",
  imports: [
    CommonModule,
    OverviewChartComponent,
    UserListItemComponent,
    ProjectCardComponent,
  ],
  templateUrl: "./manager.component.html",
  styleUrl: "./manager.component.css",
})
export class ManagerComponent {
  projectList: Project[] = projects;
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

  filterUserAsManager: User[] = this.userList.filter(
    (user) => user.role === "officer" || user.role === "user"
  );

  handleUserSelection(event: { index: number; user: User }) {
    this.selectedIndex = event.index;
  }

  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }
}

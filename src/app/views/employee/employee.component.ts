import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProjectCardComponent } from "../../component/childs/project-card/project-card.component";
import { OverviewChartComponent } from "../../component/chart/overview-chart/overview-chart.component";
import { Project, User } from "../../interfaces/user";
import { ChartType, ChartData, ChartConfiguration } from "chart.js";
import { projects } from "../../localStore/user-data";
import { AuthService } from "../../service/auth/auth.service";

@Component({
  selector: "app-employee",
  imports: [CommonModule, ProjectCardComponent, OverviewChartComponent],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.css",
})
export class EmployeeComponent implements OnInit {
  projectList: Project[] = projects;
  userDetails: User | null = null;
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userDetails = this.authService.getCurrentUser();
  }
  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }
}

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Project, User } from "../../interfaces/user";
import { MOCK_USERS, projects } from "../../localStore/user-data";
import { OverviewChartComponent } from "../../component/chart/overview-chart/overview-chart.component";
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';

@Component({
  selector: "app-admin",
  imports: [CommonModule,OverviewChartComponent],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.css",
})
export class AdminComponent {
  projectList: Project[] = projects;
  userList:User[]= MOCK_USERS

    chartType: ChartType = 'line';

  chartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Quater Overview',
        data: [10, 25, 20],
        fill: false,
        tension: 0.4,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.2)',
      },
    ],
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
}

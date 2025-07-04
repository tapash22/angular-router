import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Project, User } from '../../interfaces/user';
import { MOCK_USERS } from '../../localStore/user-data';
import { OverviewChartComponent } from '../../component/chart/overview-chart/overview-chart.component';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';
import { UserListItemComponent } from '../../component/childs/user-list-item/user-list-item.component';
import { ProjectCardComponent } from '../../component/childs/project-card/project-card.component';
import { UserService } from '../../service/user.service';
import { UserItemComponent } from '../../childs/user-item/user-item.component';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    OverviewChartComponent,
    UserListItemComponent,
    UserItemComponent,
    ProjectCardComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  userList: User[] = MOCK_USERS;
  userProfileData!: User;
  selectedIndex: number | null = null;
  chartType: ChartType = 'bar';

  workingResources: any[] = [];
  uniqueResources: any[] = [];
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor(private userService: UserService) {
    this.initializeUserChartData();
  }

  initializeUserChartData(): void {
    this.userProfileData = this.userService.getCurrentUser()!;

    const allResources =
      this.userProfileData.projects?.flatMap(
        (project) => project.working_resource
      ) || [];

    this.workingResources = allResources;

    this.uniqueResources = Array.from(
      new Map(allResources.map((r) => [r.email, r])).values()
    );

    this.chartData = {
      labels: this.uniqueResources.map((r) => r.name),
      datasets: [
        {
          label: 'Time Spent (Hours)',
          data: this.uniqueResources.map((r) => r.time_spent_hours),
          backgroundColor: '#42A5F5',
          borderRadius: 10,
          barThickness: 20, // fixed width
          categoryPercentage: 0.7, // space between groups
          barPercentage: 0.6, // space between bars within group
        },
        {
          label: 'Spacer',
          data: this.uniqueResources.map(() => 0), // invisible spacer
          backgroundColor: 'rgba(0,0,0,0)', // fully transparent
          barThickness: 10,
          barPercentage: 0.1,
          categoryPercentage: 0.7,
        },
        {
          label: 'Performance Score',
          data: this.uniqueResources.map((r) => r.performance_score),
          backgroundColor: '#66BB6A',
          borderRadius: 10,
          barThickness: 20,
          categoryPercentage: 0.7,
          barPercentage: 0.6,
        },
      ],
    };
  }

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      title: {
        display: true,
        text: 'User Project Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  projectList: Project[] | null = this.userList.flatMap(
    (user) => user.projects ?? []
  );

  handleUserSelection(event: { index: number; user: User }) {
    this.selectedIndex = event.index;
  }

  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }
}

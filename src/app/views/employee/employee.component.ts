import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../component/childs/project-card/project-card.component';
import { OverviewChartComponent } from '../../component/chart/overview-chart/overview-chart.component';
import { Project, User } from '../../interfaces/user';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';
import { MOCK_USERS } from '../../localStore/user-data';
import { UserService } from '../../service/user.service';
import { ChildLayoutComponent } from '../../layout/child-layout/child-layout.component';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    ProjectCardComponent,
    OverviewChartComponent,
    ChildLayoutComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  userList: User[] = MOCK_USERS;

  userDetails!: User;
  selectedIndex: number | null = null;

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
private userService = inject(UserService)

  projectList: Project[] | null = this.userList.flatMap(
    (user) => user.projects ?? [],
  );

  ngOnInit(): void {
    this.userDetails = this.userService.getCurrentUser()!;
  }
  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }
}

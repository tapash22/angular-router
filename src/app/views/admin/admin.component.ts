import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Project, User, AllworkingResource } from '../../interfaces/user';
import { MOCK_USERS } from '../../localStore/user-data';
import { OverviewChartComponent } from '../../component/chart/overview-chart/overview-chart.component';
import { ChartType, ChartData, ChartConfiguration, scales } from 'chart.js';
import { UserListItemComponent } from '../../component/childs/user-list-item/user-list-item.component';
import { ProjectCardComponent } from '../../component/childs/project-card/project-card.component';
import { UserService } from '../../service/user.service';
import { UserItemComponent } from '../../childs/user-item/user-item.component';
import { filter, map, Observable, of, shareReplay } from 'rxjs';

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
  selectedIndex: number | null = null;

  allWorkingResources: AllworkingResource[] = [];

  projectSummaries: {
    title: string;
    resourceCount: number;
    totalHours: number;
    avgPerformance: number;
    status: string;
  }[] = [];

  workingResources: any[] = [];
  uniqueResources: any[] = [];

  // declear chart
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  chartDataAllUsers: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  // project cart data
  chartDataProjectDistribution: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  projectList!: Project[];
  userList!: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(filter((user): user is User => !!user))
      .subscribe((user) => {
        const projects: Project[] = user.projects ?? [];
        this.generateProjectChartData(projects);
        this.initializeUserChartData(user);
      });

    this.userService.users$
      .pipe(filter((users) => users.length > 0))
      .subscribe((users) => {
        this.projectList = users.flatMap((u) => u.projects ?? []);
        this.collectAllWorkingResources(users);
        this.initializeSummaryChart();

        this.userList = users;

        // Optionally:
      });
  }

  generateProjectChartData(projects: Project[]): void {
    const labels: string[] = [];
    const resources: number[] = [];
    const hours: number[] = [];
    const scores: number[] = [];

    this.projectSummaries = [];

    projects.forEach((project) => {
      const res = project.working_resource ?? [];
      const totalHours = res.reduce(
        (acc, cur) => acc + cur.time_spent_hours,
        0
      );
      const totalScore = res.reduce(
        (acc, cur) => acc + cur.performance_score,
        0
      );
      const avgScore = res.length ? totalScore / res.length : 0;

      labels.push(project.project_title);
      resources.push(res.length);
      hours.push(totalHours);
      scores.push(+avgScore.toFixed(2));

      this.projectSummaries.push({
        title: project.project_title,
        resourceCount: res.length,
        totalHours,
        avgPerformance: +avgScore.toFixed(2),
        status: project.projectStatus,
      });
    });

    this.chartDataProjectDistribution = {
      labels,
      datasets: [
        {
          label: 'Resources Involved',
          data: resources,
          backgroundColor: '#42A5F5',
          borderRadius: 10,
        },
        {
          label: 'Total Hours',
          data: hours,
          backgroundColor: '#66BB6A',
          borderRadius: 10,
        },
        {
          label: 'Avg Performance Score',
          data: scores,
          backgroundColor: '#FFA726',
          borderRadius: 10,
        },
      ],
    };
  }

  initializeUserChartData(user: User): void {
    const allResources =
      user.projects?.flatMap((project) => project.working_resource ?? []) ?? [];

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

  initializeSummaryChart(): void {
    const summary = this.getUserPerformanceSummary();

    this.chartDataAllUsers = {
      labels: summary.map((u) => u.name),
      datasets: [
        {
          label: 'Avg. Performance Score',
          data: summary.map((u) => u.avgScore),
          backgroundColor: '#29B6F6',
          borderRadius: 10,
          barThickness: 20,
          categoryPercentage: 0.7,
          barPercentage: 0.6,
        },
        {
          label: 'Spacer',
          data: summary.map(() => 0),
          backgroundColor: 'rgba(0,0,0,0)',
          barThickness: 10,
          barPercentage: 0.1,
          categoryPercentage: 0.7,
        },
        {
          label: 'Total Time Spent (hrs)',
          data: summary.map((u) => u.totalTime),
          backgroundColor: '#66BB6A',
          borderRadius: 10,
          barThickness: 20,
          categoryPercentage: 0.7,
          barPercentage: 0.6,
        },
      ],
    };
  }

  // 🧠 Generate summary per user
  getUserPerformanceSummary() {
    const map = new Map<
      string,
      {
        name: string;
        email: string;
        totalTime: number;
        totalScore: number;
        projectCount: number;
      }
    >();

    this.allWorkingResources.forEach((r) => {
      const key = r.email;
      if (!map.has(key)) {
        map.set(key, {
          name: r.name,
          email: r.email,
          totalTime: 0,
          totalScore: 0,
          projectCount: 0,
        });
      }

      const entry = map.get(key)!;
      entry.totalTime += r.time_spent_hours;
      entry.totalScore += r.performance_score;
      entry.projectCount += 1;
    });

    return Array.from(map.values()).map((entry) => ({
      ...entry,
      avgScore: +(entry.totalScore / entry.projectCount).toFixed(2),
    }));
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

  //project chart
  // first chart into this page
  projectChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        mode: 'index',
        intersect: true,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const project = this.projectSummaries?.[index];
            return `${project?.title} (${project?.status.toUpperCase()})`;
          },
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
          },
        },
      },
      title: {
        display: true,
        text: 'Project Distribution Overview',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  summaryChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        mode: 'nearest',
        intersect: true,
      },
      title: {
        display: true,
        text: 'Overall User Performance Summary',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        title: {
          display: true,
          text: 'Score / Time',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  // make new array
  collectAllWorkingResources(users: User[]): void {
    const resources = users.flatMap((user) =>
      (user.projects ?? []).flatMap((project) =>
        (project.working_resource ?? []).map((resource) => ({
          userId: user.id, // from user
          name: resource.name,
          email: resource.email,
          time_spent_hours: resource.time_spent_hours,
          performance_score: resource.performance_score,
          projectId: project.id,
          project_title: project.project_title,
        }))
      )
    );

    // Remove duplicates by email + projectId
    const uniqueKey = new Set<string>();

    this.allWorkingResources = resources.filter((item) => {
      const key = `${item.email}-${item.projectId}`;
      if (uniqueKey.has(key)) return false;
      uniqueKey.add(key);
      return true;
    });
  }

  handleUserSelection(event: { index: number; user: User }) {
    this.selectedIndex = event.index;
  }

  handleProject(event: { index: number; project: Project }) {
    this.selectedIndex = event.index;
  }
}

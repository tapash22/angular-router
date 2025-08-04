import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';
import { DynamicDialogComponent } from '../../dialog/dynamic-dialog/dynamic-dialog.component';
import { ChartConfiguration, ChartData, ChartDataset } from 'chart.js';
import { OverviewChartComponent } from '../../chart/overview-chart/overview-chart.component';
import { ProjectWorkResourceComponent } from '../../../childs/project-work-resource/project-work-resource.component';
import { ProjectCardHeaderComponent } from '../../../childs/project-card-header/project-card-header.component';
import { ProjectCardBodyComponent } from '../../../childs/project-card-body/project-card-body.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import for icon pass as props to parents
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type ExtendedDoughnutDataset = ChartDataset<'doughnut', number[]> & {
  radius?: string;
  cutout?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
};

@Component({
  selector: 'app-project-card',
  imports: [
    CommonModule,
    FontAwesomeModule,
    DynamicDialogComponent,
    OverviewChartComponent,
    ProjectWorkResourceComponent,
    ProjectCardHeaderComponent,
    ProjectCardBodyComponent,
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Input() index!: number;
  @Input() selected: boolean = false;
  @Input() projectCardDisabled: boolean = false;
  @Input() showUserDetails: boolean = false;
  @Input() icon?: IconDefinition;

  isDialogVisible = false;

  // chart data
  doughnutChartConfig!: ChartConfiguration<'doughnut'>;

  @Output() selectProject = new EventEmitter<{
    index: number;
    project: Project;
  }>();

  @Output() editProject = new EventEmitter<Project>();
  @Output() updateResource = new EventEmitter<{
    project: Project;
    resource: any;
  }>();
  @Output() deleteProject = new EventEmitter<{
    index: number;
  }>();

  ngOnInit(): void {
    this.setupDoughnutChart();
  }

  // Optionally calculate disabled state internally based on projectStatus

  get isDisabled(): boolean {
    return this.project.projectStatus === 'pause';
  }

  // chart calculation
  setupDoughnutChart() {
    const duration = this.project.project_project_length || 0;
    const resources = this.project.project_resource_needed || 0;
    const cost = this.project.project_costing_needed / 1000; // to 'K'

    // 🔹 Calculate total working hours since joiningDate
    const joiningDate = '2020-01-15'; // replace with dynamic value if needed
    const totalTimeSpentHours = 2500; // replace with actual aggregated value if needed
    const totalWorkingHours = this.calculateWorkingHoursSince(joiningDate);

    this.doughnutChartConfig = {
      type: 'doughnut',
      data: {
        labels: ['Duration', 'Resources', 'Cost'],
        datasets: <ExtendedDoughnutDataset[]>[
          {
            label: 'Working Time (hours)',
            data: [
              totalTimeSpentHours,
              Math.max(totalWorkingHours - totalTimeSpentHours, 0),
            ],
            backgroundColor: ['#42A5F5', '#E0E0E0'],
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#fff',
            radius: '45%', // 💡 Smaller outer radius
            cutout: '50%', // 💡 Larger inner cutout
          },
          {
            label: 'Resources',
            data: [resources, 3],
            backgroundColor: ['#66BB6A', '#E0E0E0'],
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#fff',
            radius: '65%', // 💡 Next outer ring
            cutout: '66%',
          },
          {
            label: 'Cost (k)',
            data: [cost, 20],
            backgroundColor: ['#FFA726', '#E0E0E0'],
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#fff',
            radius: '85%', // 💡 Outermost ring
            cutout: '75%', // 💡 Leaves gap between rings
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
      },
    };
  }

  //  Add Helper
  calculateWorkingHoursSince(joiningDate: string, hoursPerDay = 8): number {
    const start = new Date(joiningDate);
    const end = new Date(); // now

    let totalDays = 0;
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        totalDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return totalDays * hoursPerDay;
  }

  handleSelectProject() {
    if (this.projectCardDisabled || this.isDisabled) return;
    this.selectProject.emit({ index: this.index, project: this.project });
  }

  handleEditProject(event: MouseEvent) {
    if (this.projectCardDisabled || this.isDisabled) return;
    event.stopPropagation(); // Prevent parent card click event
    this.editProject.emit(this.project);
    console.log(this.project);
  }

  projectResourceUpdate(resourceId: number) {
    const resource = this.project.working_resource.find(
      (r) => r.id === resourceId
    );

    if (this.project && resource) {
      this.updateResource.emit({ project: this.project, resource });
    } else {
      console.error('Resource not found in project');
    }
  }

  openProjectChart() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  projectDelete() {
    this.deleteProject.emit({ index: this.index });
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Project } from "../../../interfaces/user";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBarChart } from "@fortawesome/free-solid-svg-icons";
import { DynamicDialogComponent } from "../../dialog/dynamic-dialog/dynamic-dialog.component";
import { ChartConfiguration, ChartData } from "chart.js";
import { OverviewChartComponent } from "../../chart/overview-chart/overview-chart.component";

@Component({
  selector: "app-project-card",
  imports: [
    CommonModule,
    FontAwesomeModule,
    DynamicDialogComponent,
    OverviewChartComponent,
  ],
  templateUrl: "./project-card.component.html",
  styleUrl: "./project-card.component.css",
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Input() index!: number;
  @Input() selected: boolean = false;
  @Input() projectCardDisabled: boolean = false;
  @Input() showUserDetails: boolean = false;
  @Input() icon?: any;

  isDialogVisible = false;
  iconBarChart = faBarChart;

  // chart data
  doughnutChartConfig!: ChartConfiguration<"doughnut">;

  @Output() selectProject = new EventEmitter<{
    index: number;
    project: Project;
  }>();

  @Output() editProject = new EventEmitter<Project>();

  ngOnInit(): void {
    this.setupDoughnutChart();
  }

  // Corrected status-class mapping
  statusClassMap: Record<string, string> = {
    start: "bg-blue-100 ring-blue-500",
    "in-progress": "bg-yellow-100 ring-yellow-500",
    completed: "bg-green-100 ring-green-500",
    pause: "bg-gray-100 ring-gray-500",
  };

  // Optionally calculate disabled state internally based on projectStatus
  get isDisabled(): boolean {
    return this.project.projectStatus === "pause";
  }

  // chart calculation
  setupDoughnutChart() {
    const duration = this.project.project_project_length || 0;
    const resources = this.project.project_resource_needed || 0;
    const cost = this.project.project_costing_needed / 1000; // to 'K'

    // 🔹 Calculate total working hours since joiningDate
    const joiningDate = "2020-01-15"; // replace with dynamic value if needed
    const totalTimeSpentHours = 2500; // replace with actual aggregated value if needed
    const totalWorkingHours = this.calculateWorkingHoursSince(joiningDate);

    this.doughnutChartConfig = {
      type: "doughnut",
      data: {
        labels: ["Duration", "Resources", "Cost"],
        datasets: [
          {
            label: "Working Time (hours)",
            data: [
              totalTimeSpentHours,
              Math.max(totalWorkingHours - totalTimeSpentHours, 0),
            ],
            backgroundColor: ["#42A5F5", "#E0E0E0"],
            ...({
              radius: "20%",
              cutout: "20%",
            } as any),
          },
          {
            label: "Resources",
            data: [resources, 0],
            backgroundColor: ["#66BB6A", "#E0E0E0"],
            ...({
              radius: "30%",
              cutout: "20%",
            } as any),
          },
          {
            label: "Cost (k)",
            data: [cost, 0],
            backgroundColor: ["#FFA726", "#E0E0E0"],
            ...({
              radius: "50%",
              cutout: "20%",
            } as any),
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
  }

  openProjectChart() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }
}

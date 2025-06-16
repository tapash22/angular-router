import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Project } from "../../../interfaces/user";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "app-project-card",
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: "./project-card.component.html",
  styleUrl: "./project-card.component.css",
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() index!: number;
  @Input() selected: boolean = false;
  @Input() projectCardDisabled: boolean = false;
  @Input() showUserDetails:boolean = false;
  @Input() icon?: any;

  @Output() selectProject = new EventEmitter<{
    index: number;
    project: Project;
  }>();

  @Output() editProject = new EventEmitter<Project>();

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

  handleSelectProject() {
    if (this.projectCardDisabled || this.isDisabled) return;
    this.selectProject.emit({ index: this.index, project: this.project });
  }

  handleEditProject(event: MouseEvent) {
    if (this.projectCardDisabled || this.isDisabled) return;
    event.stopPropagation(); // Prevent parent card click event
    this.editProject.emit(this.project);
  }
}

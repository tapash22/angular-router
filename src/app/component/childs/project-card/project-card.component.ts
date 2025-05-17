import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Project } from "../../../interfaces/user";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-project-card",
  imports: [CommonModule],
  templateUrl: "./project-card.component.html",
  styleUrl: "./project-card.component.css",
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() index!: number;
  @Input() selected: boolean = false;

  @Output() selectProject = new EventEmitter<{
    index: number;
    project: Project;
  }>();

  handleSelectProject() {
    this.selectProject.emit({ index: this.index, project: this.project });
  }
}

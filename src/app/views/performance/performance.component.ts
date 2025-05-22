import { Component, Input } from "@angular/core";
import { DynamicDialogComponent } from "../../component/dialog/dynamic-dialog/dynamic-dialog.component";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-performance",
  imports: [DynamicDialogComponent, CommonModule,ReactiveFormsModule],
  templateUrl: "./performance.component.html",
  styleUrl: "./performance.component.css",
})
export class PerformanceComponent {
  showDialog: boolean = false;
  submitBtnTitle: string = "Click";
  color: string = "bg-gray-200";

  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      project_title: ["", Validators.required],
      project_subtitle: [""],
      project_project_length: [null],
      project_estimated_date: [""],
    });
  }

  dialogFormOpen() {
    this.showDialog = true;
    console.log("open form");
  }

  closeDialog() {
    this.showDialog = false;
  }

  dialogAction() {
    console.log("dialog action", this.form.value);
    this.showDialog = false;
  }
}

import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-dynamic-dialog",
  imports: [CommonModule],
  templateUrl: "./dynamic-dialog.component.html",
  styleUrl: "./dynamic-dialog.component.css",
})
export class DynamicDialogComponent {
  @Input() title!: string;
  @Input() size: "tiny" | "sm" | "md" | "lg" | "xl" | "xxl" = "sm";
  @Input() show = false;
  @Input() disableClose = false;
  @Input() showFooter = true;
  @Input() submitBtnTitle!: string;
  @Output() onClose = new EventEmitter<void>();

  get dialogWidth(): string {
    switch (this.size) {
      case "tiny":
        return "w-[20%]";
      case "sm":
        return "w-[30%]";
      case "md":
        return "w-[40%]";
      case "lg":
        return "w-[50%]";
      case "xl":
        return "w-[70%]";
      case "xxl":
        return "w-[80%]";
      default:
        return "w-[30%]";
    }
  }

  closeDialog() {
    if (!this.disableClose) {
      this.onClose.emit();
    }
  }
}

import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import { ToastType } from "../../../../service/toaster.service";

@Component({
  selector: "app-toaster",
  imports: [CommonModule],
  templateUrl: "./toaster.component.html",
  styleUrl: "./toaster.component.css",
})
export class ToasterComponent implements OnChanges {
  @Input() message: string = "";
  @Input() type: ToastType = "info";
  @Input() duration: number = 1000;

  visible = false;

    ngOnChanges() {
    if (this.message?.trim().replace(/\s/g, '').length > 1) {
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    }
  }
}

import { Component } from "@angular/core";
import { LayoutComponent } from "./layout/layout/layout.component";
import { ToasterComponent } from "./component/childs/shared/toaster/toaster.component";
import { ToasterService, ToastType } from "./service/toaster.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [LayoutComponent, ToasterComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  toastMessage = "";
  toastType: ToastType = "info";
  toastDuration = 1000;

  private timeoutId: any;

  constructor(private toasterService: ToasterService) {
    this.toasterService.toast$.subscribe(({ message, type, duration }) => {
      this.toastMessage = message;
      this.toastType = type;
      this.toastDuration = duration;

      clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        this.toastMessage = "";
      }, duration);
    });
  }
}

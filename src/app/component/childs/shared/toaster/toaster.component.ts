import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-toaster",
  imports: [CommonModule],
  templateUrl: "./toaster.component.html",
  styleUrl: "./toaster.component.css",
})
export class ToasterComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  visible = false;


  ngOnInit() {
    if (this.message?.trim().replace(/\s/g, '').length > 1) {
      this.visible = true;
      const charsPerSecond = 100;
      const minTime = 2000;
      const maxTime = 20000;
      const timeout = Math.min(
        Math.max((this.message.length / charsPerSecond) * 1000, minTime),
        maxTime
      );
      setTimeout(() => {
        this.visible = false;
      }, timeout);
    }
  }
}

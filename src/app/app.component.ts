import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout/layout.component';
import { ToasterComponent } from './component/childs/shared/toaster/toaster.component';
import { ToasterService } from './service/toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent,ToasterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 toastMessage = '';
  toastType: 'success' | 'error' | 'info' | 'warning' = 'info';

  constructor(private toasterService: ToasterService) {
    this.toasterService.toast$.subscribe(({ message, type }) => {
      this.toastMessage = message;
      this.toastType = type;

      setTimeout(() => {
        this.toastMessage = '';
      }, 8000);
    });
  }
}

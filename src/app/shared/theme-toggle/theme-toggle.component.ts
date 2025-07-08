import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService } from '../../service/core/theme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { DynamicButtonComponent } from '../../childs/dynamic-button/dynamic-button.component';
import { Observable } from 'rxjs';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule, FontAwesomeModule, DynamicButtonComponent],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  iconDarkMode = faMoon;

  constructor(public themeService: ThemeService) {}

  get darkMode$(): Observable<boolean> {
    return this.themeService.darkMode$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

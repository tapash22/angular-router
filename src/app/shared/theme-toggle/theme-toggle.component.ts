import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService } from '../../service/core/theme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { DynamicButtonComponent } from '../../childs/dynamic-button/dynamic-button.component';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule, FontAwesomeModule, DynamicButtonComponent],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  iconDarkMode = faMoon;
  darkMode: boolean;

  constructor(public themeService: ThemeService) {
    this.darkMode = this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.darkMode = this.themeService.isDarkMode(); 
  }
}

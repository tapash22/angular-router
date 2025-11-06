import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);

  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('prefers-color-scheme:dark').matches;
    this.darkModeSubject.next(isDark);
    this.applyTheme(isDark);
  }

  toggleTheme(): void {
    const newDarkMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newDarkMode);
    this.applyTheme(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : '');
  }

  applyTheme(isDark: boolean): void {
    const classList = document.documentElement.classList;
    classList.toggle('dark', isDark);
  }
}

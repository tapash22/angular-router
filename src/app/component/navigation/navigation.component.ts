import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive,  } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  menuItems: any[] = [
    { id: 1, name: 'dashboard', link: 'dashboard' },
    { id: 2, name: 'admin', link: 'admin' },
    { id: 3, name: 'manager', link: 'manager' },
    { id: 4, name: 'officer', link: 'officer' },
    { id: 5, name: 'employee', link: 'employee' },
    { id: 6, name: 'performance', link: 'performance' },
    { id: 7, name: 'work', link: 'work' },
  ];
}

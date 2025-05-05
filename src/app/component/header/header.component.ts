import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faHome } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-header',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  iconBell = faBell;
  iconHome = faHome

}

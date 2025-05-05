import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { HeaderComponent } from '../../component/header/header.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,NavigationComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}

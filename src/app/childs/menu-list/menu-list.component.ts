import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  imports: [CommonModule,RouterLink,FontAwesomeModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent {
  @Input() visibleMenuItems!: any
  @Input() collapsed!: boolean
  @Input() activeLink!: string 

  @Output() itemClick = new EventEmitter<any>();

    constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeLink = event.urlAfterRedirects.split('?')[0].split('#')[0];
      });
  }

  // onClick(item: any) {
  //   if (!this.useRouterLink) {
  //     this.itemClick.emit(item, this.);
  //   }
  // }
}

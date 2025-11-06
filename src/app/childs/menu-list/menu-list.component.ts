import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent implements OnInit {
  @Input() visibleMenuItems!: any[];
  @Input() collapsed?: boolean;
  @Input() haveId?: boolean;

  @Input() activeLink!: string;
  @Output() activeLinkChange = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit() {
    if (!this.haveId) {
      this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.activeLink = event.urlAfterRedirects.split('?')[0].split('#')[0];
          this.activeLinkChange.emit(this.activeLink);
        });
    }
  }

  onItemClicked(item: any) {
    if (this.haveId) {
      this.activeLink = item.id;
      document
        .getElementById(item.id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      this.activeLink = item.link;
    }
    this.activeLinkChange.emit(this.activeLink);
  }

  isActive(item: any): boolean {
    return this.haveId
      ? this.activeLink === item.id
      : this.activeLink.includes(item.link);
  }
}

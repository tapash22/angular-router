import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() visibleMenuItems!: any[];
  @Input() collapsed?: boolean;
  @Input() haveId?: boolean;

  @Input() activeLink!: string;
  @Output() activeLinkChange = new EventEmitter<string>();
  private router = inject(Router)


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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  isActive(item: { id?: string; link?: string }): boolean {
    if (!item || !this.activeLink) return false;

    if (this.haveId) {
      return this.activeLink === item.id;
    } else {
      return item.link ? this.activeLink.includes(item.link) : false;
    }
  }

}

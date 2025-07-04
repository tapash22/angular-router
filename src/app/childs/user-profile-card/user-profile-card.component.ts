import { Component, Input } from '@angular/core';
import { DynamicSectionCardReadFieldComponent } from '../../childs/dynamic-section-card-read-field/dynamic-section-card-read-field.component';
import { UserInfoItem } from '../../interfaces/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-card',
  imports: [
    FontAwesomeModule,
    CommonModule,
    DynamicSectionCardReadFieldComponent,
  ],
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.css',
})
export class UserProfileCardComponent {
  @Input() userInfo: UserInfoItem[] = [];

  get firstObject(): UserInfoItem | undefined {
    return this.userInfo[0];
  }

    get userRole(): UserInfoItem | undefined {
    return this.userInfo[1];
  }

  get restObjects(): UserInfoItem[] {
    return this.userInfo.slice(1);
  }
}

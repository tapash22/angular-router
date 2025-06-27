import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropdownCardComponent } from './user-dropdown-card.component';

describe('UserDropdownCardComponent', () => {
  let component: UserDropdownCardComponent;
  let fixture: ComponentFixture<UserDropdownCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDropdownCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDropdownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

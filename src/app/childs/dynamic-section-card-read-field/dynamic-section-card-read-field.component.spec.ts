import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSectionCardReadFieldComponent } from './dynamic-section-card-read-field.component';

describe('DynamicSectionCardReadFieldComponent', () => {
  let component: DynamicSectionCardReadFieldComponent;
  let fixture: ComponentFixture<DynamicSectionCardReadFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSectionCardReadFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSectionCardReadFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicChipComponent } from './dynamic-chip.component';

describe('DynamicChipComponent', () => {
  let component: DynamicChipComponent;
  let fixture: ComponentFixture<DynamicChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRatingStarComponent } from './dynamic-rating-star.component';

describe('DynamicRatingStarComponent', () => {
  let component: DynamicRatingStarComponent;
  let fixture: ComponentFixture<DynamicRatingStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicRatingStarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicRatingStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

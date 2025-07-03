import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar as solidStar,
  faStarHalfAlt,
  faStar as emptyStar,
} from '@fortawesome/free-solid-svg-icons';

//declear the type of start
type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: 'app-dynamic-rating-star',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './dynamic-rating-star.component.html',
  styleUrl: './dynamic-rating-star.component.css',
})
export class DynamicRatingStarComponent {
  // pass tile and rating list from parent
  @Input() titleTag!: string;
  @Input() rating: number | null | undefined = 0;

  ratingStars: StarType[] = [];

  // import icon for use
  solidStar = solidStar;
  halfStar = faStarHalfAlt;
  emptyStar = emptyStar;

  ngOnChanges(): void {
    this.generateStars(this.rating);
  }

  //use star calculation
  private generateStars(rating: number | null | undefined): void {
    if (rating == null || isNaN(rating)) {
      this.ratingStars = Array<StarType>(5).fill('empty');
      return;
    }

    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    this.ratingStars = [
      ...Array<StarType>(full).fill('full'),
      ...Array<StarType>(half).fill('half'),
      ...Array<StarType>(empty).fill('empty'),
    ];
  }
}

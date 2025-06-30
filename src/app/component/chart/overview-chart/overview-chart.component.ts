import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-overview-chart',
  imports: [BaseChartDirective, CommonModule], // ✅ No NgChartsModule
  templateUrl: './overview-chart.component.html',
  styleUrl: './overview-chart.component.css',
})
export class OverviewChartComponent {
  @Input() size: 'tiny' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'sm';

  @Input() type: ChartType = 'bar';
  // Generic types to allow flexibility from parent
  @Input() data!: ChartData;
  @Input() options?: ChartConfiguration['options'];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  get dialogWidth(): string {
    switch (this.size) {
      case 'tiny':
        return 'w-[20%]';
      case 'sm':
        return 'w-[30%]';
      case 'md':
        return 'w-[20%]';
      case 'lg':
        return 'w-[50%]';
      case 'xl':
        return 'w-[70%]';
      case 'xxl':
        return 'w-[80%]';
      default:
        return 'w-[30%]';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      setTimeout(() => {
        this.chart?.update();
      }, 0);
    }
  }
}

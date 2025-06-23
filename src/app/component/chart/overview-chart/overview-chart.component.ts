import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-overview-chart',
  imports: [BaseChartDirective], // ✅ No NgChartsModule
  templateUrl: './overview-chart.component.html',
  styleUrl: './overview-chart.component.css',
})
export class OverviewChartComponent {
  @Input() type: ChartType = 'bar';

  // Generic types to allow flexibility from parent
  @Input() data!: ChartData;
  @Input() options?: ChartConfiguration['options'];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      setTimeout(() => {
        this.chart?.update();
      }, 0);
    }
  }
}

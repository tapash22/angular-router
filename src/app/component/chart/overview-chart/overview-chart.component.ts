import { Component, Input } from '@angular/core';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective    } from 'ng2-charts'

@Component({
  selector: 'app-overview-chart',
 imports: [BaseChartDirective], // ✅ No NgChartsModule
  template: `
    <canvas
      baseChart
      [type]="type"
      [data]="data"
      [options]="options">
    </canvas>
  `,
  styleUrl: './overview-chart.component.css'
})
export class OverviewChartComponent {
 @Input() type: ChartType = 'bar';

  // Generic types to allow flexibility from parent
  @Input() data!: ChartData;
  @Input() options?: ChartConfiguration['options'];
  
}

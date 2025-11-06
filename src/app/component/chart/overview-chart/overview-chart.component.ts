import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-overview-chart',
  imports: [BaseChartDirective, CommonModule], // ✅ No NgChartsModule
  templateUrl: './overview-chart.component.html',
  styleUrl: './overview-chart.component.css',
})
export class OverviewChartComponent implements OnChanges {
  @Input() type: ChartType = 'bar';
  // Generic types to allow flexibility from parent
  @Input() data!: ChartData;
  @Input() options?: ChartConfiguration['options'];

  // height pass for chart size as
  @Input() chartHeight?: number;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  get canvasHeight(): string {
    return this.chartHeight ? `${this.chartHeight}px` : '300px';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options) {
      this.options.maintainAspectRatio = false;
    }
    if (this.chart) {
      setTimeout(() => this.chart?.update(), 0);
    }
  }
}

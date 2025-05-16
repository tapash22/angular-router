import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  BarController,
  BarElement,
  DoughnutController,
  ArcElement
} from 'chart.js';

Chart.register(
  // Line
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,

  // Bar
  BarController,
  BarElement,

  // Doughnut
  DoughnutController,
  ArcElement
);

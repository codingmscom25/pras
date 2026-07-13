import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
  LineController,
  DoughnutController
} from 'chart.js';

import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard
  implements OnInit, AfterViewInit, OnDestroy {

  dashboard: any = null;

  private recoveryChart?: Chart;

  private successChart?: Chart;

  constructor(

    private dashboardService:
      DashboardService,
      private cdr: 
          ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  ngAfterViewInit(): void {

    Chart.register(
  CategoryScale,
  LinearScale,

  PointElement,
  LineElement,
  ArcElement,

  LineController,
  DoughnutController,

  Title,
  Tooltip,
  Legend,

  Filler
);

  }

  ngOnDestroy(): void {

    this.recoveryChart?.destroy();

    this.successChart?.destroy();

  }

  loadDashboard(): void {

  this.dashboardService
    .getDashboard()
    .subscribe({

      next: (response: any) => {

        this.dashboard = response.data;

        this.cdr.detectChanges();

        requestAnimationFrame(() => {

          this.createRecoveryChart();

          this.createSuccessChart();

        });

      },

      error: err => {

        console.error(err);

      }

    });

}

  get cards() {

    return [

      {

        title: 'Total Clients',

        value: this.dashboard?.totalClients ?? 0,

        change: '',

        icon: 'fa-users',

        color: 'blue'

      },

      {

        title: 'Active Clients',

        value: this.dashboard?.activeClients ?? 0,

        change: '',

        icon: 'fa-user-check',

        color: 'green'

      },

      {

        title: 'Recoveries',

        value: this.dashboard?.totalRecoveries ?? 0,

        change: '',

        icon: 'fa-key',

        color: 'orange'

      },

      {

        title: 'Completed',

        value: this.dashboard?.completedRecoveries ?? 0,

        change: '',

        icon: 'fa-circle-check',

        color: 'success'

      },

      {

        title: 'Pending',

        value: this.dashboard?.pendingRecoveries ?? 0,

        change: '',

        icon: 'fa-spinner',

        color: 'warning'

      },

      {

        title: 'Expired',

        value: this.dashboard?.expiredRecoveries ?? 0,

        change: '',

        icon: 'fa-hourglass-end',

        color: 'danger'

      }

    ];

  }

  createRecoveryChart(): void {

  if (!this.dashboard?.last7Days?.length) {
    return;
  }

  this.recoveryChart?.destroy();

  this.recoveryChart = new Chart("recoveryChart", {

    type: "line",

    data: {

      labels: this.dashboard.last7Days.map(
        (x: any) => x.day
      ),

      datasets: [

        {

          label: "Recovery Requests",

          data: this.dashboard.last7Days.map(
            (x: any) => x.count
          ),

          borderColor: "#2563EB",

          backgroundColor: "rgba(37,99,235,.12)",

          fill: true,

          tension: .4

        }

      ]

    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {

        legend: {

          display: false

        }

      }

    }

  });

}
  createSuccessChart(): void {

  if (!this.dashboard) {
    return;
  }

  this.successChart?.destroy();

  this.successChart = new Chart("successChart", {

    type: "doughnut",

    data: {

      labels: [

        "Completed",

        "Pending",

        "Expired"

      ],

      datasets: [

        {

          data: [

            this.dashboard.completedRecoveries,

            this.dashboard.pendingRecoveries,

            this.dashboard.expiredRecoveries

          ],

          backgroundColor: [

            "#10B981",

            "#F59E0B",

            "#EF4444"

          ],

          borderWidth: 0

        }

      ]

    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      cutout: "72%",

      plugins: {

        legend: {

          position: "bottom"

        }

      }

    }

  });

}

get recentRecoveries(){

return this.dashboard?.recentRecoveries ?? [];

}

get topClients(){

return this.dashboard?.topClients ?? [];

}
  

}
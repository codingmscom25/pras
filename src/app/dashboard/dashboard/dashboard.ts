import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements AfterViewInit {

    ngAfterViewInit(): void {

        Chart.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            ArcElement,
            Title,
            Tooltip,
            Legend
        );

        this.loadRecoveryChart();

        this.loadSuccessChart();
      }

      loadSuccessChart(){

new Chart("successChart",{

type:"doughnut",

data:{

labels:[

"Successful",

"Failed"

],

datasets:[{

data:[93,7],

backgroundColor:[

"#10B981",

"#EF4444"

],

borderWidth:0

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom"

}

},

cutout:"72%"

}

});

}
     

      loadRecoveryChart(){

new Chart("recoveryChart",{

type:"line",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[{

label:"Recovery Requests",

data:[12,18,9,25,30,24,40],

borderColor:"#2563EB",

backgroundColor:"rgba(37,99,235,.12)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

}

}

});

}

  cards = [

    {
      title:'Total Clients',
      value:'124',
      change:'+12%',
      icon:'fa-users',
      color:'blue'
    },

    {
      title:'Active Clients',
      value:'118',
      change:'+4%',
      icon:'fa-user-check',
      color:'green'
    },

    {
      title:'Recoveries Today',
      value:'42',
      change:'+18%',
      icon:'fa-key',
      color:'orange'
    },

    {
      title:'Successful',
      value:'39',
      change:'93%',
      icon:'fa-circle-check',
      color:'success'
    },

    {
      title:'Failed',
      value:'3',
      change:'7%',
      icon:'fa-circle-xmark',
      color:'danger'
    },

    {
      title:'Emails Sent',
      value:'2,451',
      change:'+15%',
      icon:'fa-envelope',
      color:'purple'
    }

  ];

}

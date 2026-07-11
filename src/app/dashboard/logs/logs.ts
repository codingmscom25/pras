import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logs',
  imports: [CommonModule, FormsModule],
  templateUrl: './logs.html',
  styleUrl: './logs.css',
})
export class Logs {

  showDetails = false;

selectedLog: any = null;

viewLog(log: any) {

  this.selectedLog = log;

  this.showDetails = true;

}

closeDrawer() {

  this.showDetails = false;

}
  search = '';

  method = 'All';

  status = 'All';

  logs = [

    {
      id:'LOG-1001',
      endpoint:'/api/password-recovery/request',
      method:'POST',
      client:'ZECO Help Desk',
      status:'200',
      responseTime:'182 ms',
      date:'11 Jul 2026 08:21 AM'
    },

    {
      id:'LOG-1002',
      endpoint:'/api/password-recovery/verify-otp',
      method:'POST',
      client:'IRIFAMS',
      status:'200',
      responseTime:'143 ms',
      date:'11 Jul 2026 08:32 AM'
    },

    {
      id:'LOG-1003',
      endpoint:'/api/password-recovery/reset',
      method:'PUT',
      client:'Coastal Monitor',
      status:'500',
      responseTime:'401 ms',
      date:'11 Jul 2026 09:10 AM'
    },

    {
      id:'LOG-1004',
      endpoint:'/api/password-recovery/request',
      method:'POST',
      client:'PRAS Demo',
      status:'401',
      responseTime:'98 ms',
      date:'11 Jul 2026 09:30 AM'
    }

  ];

}

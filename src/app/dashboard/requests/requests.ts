import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-requests',
  imports: [[CommonModule, FormsModule]],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests {
  search = '';

  status = 'All';

  client = 'All';

  requests = [

    {
      id:'REQ-1001',
      client:'ZECO Help Desk',
      email:'user1@gmail.com',
      otp:'348921',
      status:'Success',
      ip:'196.41.90.22',
      date:'11 Jul 2026'
    },

    {
      id:'REQ-1002',
      client:'IRIFAMS',
      email:'john@gmail.com',
      otp:'741258',
      status:'Pending',
      ip:'197.250.12.55',
      date:'11 Jul 2026'
    },

    {
      id:'REQ-1003',
      client:'Coastal Monitor',
      email:'mary@gmail.com',
      otp:'102563',
      status:'Failed',
      ip:'102.68.11.80',
      date:'10 Jul 2026'
    },

    {
      id:'REQ-1004',
      client:'PRAS Demo',
      email:'demo@gmail.com',
      otp:'458963',
      status:'Expired',
      ip:'41.73.201.41',
      date:'10 Jul 2026'
    }

  ];

  showDetails = false;

selectedRequest: any = null;

viewDetails(request: any) {

  this.selectedRequest = request;

  this.showDetails = true;

}

closeDetails() {

  this.showDetails = false;

}

}

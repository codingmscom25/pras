import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.html',
  styleUrls: ['./clients.css']
})
export class Clients {

  search = '';

  status = 'All';

  clients = [

  {
    id:1,
    name:'ZECO Help Desk',
    email:'admin@zeco.go.tz',
    apiKey:'pras_live_hJ82ks9LmX4PQw78',
    status:'Active',
    showKey:false
  },

  {
    id:2,
    name:'IRIFAMS',
    email:'admin@irifams.com',
    apiKey:'pras_live_aT56LmP90YxQr321',
    status:'Active',
    showKey:false
  },

  {
    id:3,
    name:'Coastal Monitor',
    email:'info@coastal.com',
    apiKey:'pras_test_Xy89LpQ45RtMn672',
    status:'Inactive',
    showKey:false
  }

];

  showModal = false;

isEdit = false;

selectedClient: any = null;

clientForm = {

  name: '',

  email: '',

  description: ''

};

openAddModal() {

  this.isEdit = false;

  this.clientForm = {

    name: '',

    email: '',

    description: ''

  };

  this.showModal = true;

}

openEditModal(client: any) {

  this.isEdit = true;

  this.selectedClient = client;

  this.clientForm = {

    name: client.name,

    email: client.email,

    description: client.description || ''

  };

  this.showModal = true;

}

closeModal() {

  this.showModal = false;

}

saveClient() {

  console.log(this.clientForm);

  this.closeModal();

}

copyApiKey(key: string) {

  navigator.clipboard.writeText(key);

  // SweetAlert later

}

generateApiKey(client: any) {

  console.log(client);

}

toggleStatus(client:any){

    client.status =
    client.status === 'Active'
    ? 'Inactive'
    : 'Active';

}

toggleApiKey(client:any){

    client.showKey = !client.showKey;

}

deleteClient(client:any){

    console.log(client);

    // SweetAlert + Backend later

}

}
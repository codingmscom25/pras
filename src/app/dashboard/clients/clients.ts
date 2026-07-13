import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, ClientService } from '../../services/client.service';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clients.html',
  styleUrls: ['./clients.css']
})
export class Clients implements OnInit {
  clients: Client[] = [];

  search = '';

  status = 'All';

  constructor(

  private clientService: ClientService,
  private cdr: 
    ChangeDetectorRef

) {}

filteredClients: Client[] = [];

pagedClients: Client[] = [];

currentPage = 1;

pageSize = 10;

totalPages = 1;

sortOrder: 'ASC' | 'DESC' = 'ASC';

  showModal = false;


  ngOnInit(): void {

    this.loadClients();

}
isEdit = false;

selectedClient: any = null;

clientForm = {

  name: '',

  baseUrl: ''

};
loadClients(): void {
  this.clientService.getAll()
    .subscribe({
      next: (response) => {
        this.clients = response.data.map(client => ({
          ...client,
          showKey: false
        }));

        this.filteredClients = [...this.clients];
        this.sortClients();

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
      }
    });
}

openAddModal() {

  this.isEdit = false;

  this.clientForm = {

  name: '',

  baseUrl: ''

};

  this.showModal = true;

}

openEditModal(client: any) {

  this.isEdit = true;

  this.selectedClient = client;

  this.clientForm = {

  name: client.name,

  baseUrl: client.baseUrl

};

  this.showModal = true;

}

closeModal() {

  this.showModal = false;

}

saveClient(): void {

  if (this.isEdit) {

    this.clientService.update(

      this.selectedClient.id,

      this.clientForm

    ).subscribe({

      next: () => {

        Swal.fire({

          icon: 'success',

          title: 'Success',

          text: 'Client updated successfully.',

          timer: 2500,

          showConfirmButton: false

        });

        this.closeModal();

        this.loadClients();

      },

      error: (error) => {

        Swal.fire({

          icon: 'error',

          title: 'Update Failed',

          text: error.error?.message,

          timer: 3000,

          showConfirmButton: false

        });

      }

    });

  }

  else {

    this.clientService.create(

      this.clientForm

    ).subscribe({

      next: () => {

        Swal.fire({

          icon: 'success',

          title: 'Success',

          text: 'Client added successfully.',

          timer: 2500,

          showConfirmButton: false

        });

        this.closeModal();

        this.loadClients();

      },

      error: (error) => {

        Swal.fire({

          icon: 'error',

          title: 'Unable to Save',

          text: error.error?.message,

          timer: 3000,

          showConfirmButton: false

        });

      }

    });

  }

}

copyApiKey(key: string): void {

  navigator.clipboard.writeText(key);

  Swal.fire({

    icon: 'success',

    title: 'Copied',

    text: 'API Key copied successfully.',

    timer: 2000,

    showConfirmButton: false

  });

}

generateApiKey(client: any) {

  console.log(client);

}

toggleStatus(client: Client): void {

  this.clientService

      .toggleStatus(client.id)

      .subscribe({

        next: () => {

          this.loadClients();

        },

        error: (error) => {

          Swal.fire({

            icon: 'error',

            title: 'Operation Failed',

            text: error.error?.message,

            timer: 3000,

            showConfirmButton: false

          });

        }

      });

}

toggleApiKey(client:any){

    client.showKey = !client.showKey;

}

deleteClient(client: Client): void {

  Swal.fire({

    title: 'Delete Client?',

    text: `${client.name} will be permanently removed.`,

    icon: 'warning',

    showCancelButton: true,

    confirmButtonText: 'Delete',

    confirmButtonColor: '#dc2626',

    cancelButtonText: 'Cancel'

  })

  .then(result => {

    if (!result.isConfirmed) {

      return;

    }

    this.clientService

      .delete(client.id)

      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Deleted',

            text: 'Client deleted successfully.',

            timer: 2500,

            showConfirmButton: false

          });

          this.loadClients();

        },

        error: err => {

          Swal.fire({

            icon: 'error',

            title: 'Delete Failed',

            text: err.error?.message,

            timer: 3000,

            showConfirmButton: false

          });

        }

      });

  });

}

get totalClients(): number {

  return this.clients.length;

}

get activeClients(): number {

  return this.clients.filter(

    client => client.status === 'ACTIVE'

  ).length;

}

get totalApiKeys(): number {

  return this.clients.length;

}

applyFilters(): void {

  this.filteredClients = this.clients.filter(client => {

    const matchesSearch =

      client.name
        .toLowerCase()
        .includes(this.search.toLowerCase());

    const matchesStatus =

      this.status === 'All' ||

      client.status === this.status;

    return matchesSearch && matchesStatus;

  });

  this.currentPage = 1;

  this.sortClients();

}

sortClients(): void {

  this.filteredClients.sort((a, b) => {

    return this.sortOrder === 'ASC'

      ? a.name.localeCompare(b.name)

      : b.name.localeCompare(a.name);

  });

  this.updatePagination();

}

updatePagination(): void {

  this.totalPages = Math.ceil(

    this.filteredClients.length / this.pageSize

  );

  if (this.totalPages === 0) {

    this.totalPages = 1;

  }

  if (this.currentPage > this.totalPages) {

    this.currentPage = this.totalPages;

  }

  const start =

    (this.currentPage - 1) * this.pageSize;

  const end =

    start + this.pageSize;

  this.pagedClients =

    this.filteredClients.slice(start, end);

}

previousPage(): void {

  if (this.currentPage > 1) {

    this.currentPage--;

    this.updatePagination();

  }

}

nextPage(): void {

  if (this.currentPage < this.totalPages) {

    this.currentPage++;

    this.updatePagination();

  }

}

get startRecord(): number {

  if (this.filteredClients.length === 0) {

    return 0;

  }

  return (

    (this.currentPage - 1) *

    this.pageSize

  ) + 1;

}

get endRecord(): number {

  return Math.min(

    this.currentPage * this.pageSize,

    this.filteredClients.length

  );

}

}
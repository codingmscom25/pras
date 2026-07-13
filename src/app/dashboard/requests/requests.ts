import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecoveryRequest, RecoveryService, RecoveryStatistics } from '../../services/recovery.service';

@Component({
  selector: 'app-requests',
  imports: [[CommonModule, FormsModule]],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests implements OnInit{
  search = '';

  status = 'All';

  client = 'All';

filteredRequests: RecoveryRequest[] = [];

clients: string[] = [];

  requests: RecoveryRequest[] = [];

   statistics!: RecoveryStatistics;

  showDetails = false;

  selectedRequest: any = null;

  // Pagination
currentPage = 1;

pageSize = 10;

totalPages = 1;

pagedRequests: RecoveryRequest[] = [];

// Sorting
sortOrder: 'DESC' | 'ASC' = 'DESC';

constructor(

  private recoveryService: 
    RecoveryService,
  private cdr: 
    ChangeDetectorRef

) {}

ngOnInit(): void {

  this.loadStatistics();

  this.loadRequests();

}

viewDetails(request: RecoveryRequest): void {

  this.recoveryService

      .getDetails(request.id)

      .subscribe({

        next: response => {

          this.selectedRequest = response.data;

          this.showDetails = true;

        }

      });

}

closeDetails() {

  this.showDetails = false;

}

loadStatistics(): void {

  this.recoveryService

      .getStatistics()

      .subscribe({

        next: response => {

          this.statistics = response.data;

          this.cdr.detectChanges();

        }

      });

}
loadRequests(): void {

  this.recoveryService.getAll().subscribe({

    next: response => {

      this.requests = response.data;

      this.filteredRequests = [...this.requests];
      this.sortRequests();

      this.clients = [
        'All',
        ...new Set(
          this.requests.map(r => r.client)
        )
      ];

      this.cdr.detectChanges();

    }

  });

}

applyFilters(): void {

  this.filteredRequests = this.requests.filter(request => {

    const matchesSearch =

      request.identifier
        .toLowerCase()
        .includes(this.search.toLowerCase());

    const matchesStatus =

      this.status === 'All' ||

      request.status === this.status;

    const matchesClient =

      this.client === 'All' ||

      request.client === this.client;

    return matchesSearch &&
           matchesStatus &&
           matchesClient;

  });

  this.currentPage = 1;

  this.sortRequests();

}

updatePagination(): void {

  this.totalPages = Math.ceil(
    this.filteredRequests.length / this.pageSize
  );

  if (this.totalPages === 0) {
    this.totalPages = 1;
  }

  if (this.currentPage > this.totalPages) {
    this.currentPage = this.totalPages;
  }

  const start = (this.currentPage - 1) * this.pageSize;

  const end = start + this.pageSize;

  this.pagedRequests =
    this.filteredRequests.slice(start, end);

}

nextPage(): void {

  if (this.currentPage < this.totalPages) {

    this.currentPage++;

    this.updatePagination();

  }

}

sortRequests(): void {

  this.filteredRequests.sort((a, b) => {

    const first = new Date(a.createdAt).getTime();

    const second = new Date(b.createdAt).getTime();

    return this.sortOrder === 'DESC'

      ? second - first

      : first - second;

  });

  this.updatePagination();

}

previousPage(): void {

  if (this.currentPage > 1) {

    this.currentPage--;

    this.updatePagination();

  }

}

get endRecord(): number {

  return Math.min(

    this.currentPage * this.pageSize,

    this.filteredRequests.length

  );

}

get startRecord(): number {

  if (this.filteredRequests.length === 0) {
    return 0;
  }

  return (this.currentPage - 1) * this.pageSize + 1;

}



}

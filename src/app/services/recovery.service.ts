import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface RecoveryRequest {

  id: string;

  client: string;

  identifier: string;

  status: 'PENDING' | 'VERIFIED' | 'COMPLETED' | 'EXPIRED';

  createdAt: string;

}

export interface RecoveryDetails {

  id: string;

  client: string;

  identifier: string;

  status: string;

  createdAt: string;

  verifiedAt: string | null;

  expiresAt: string;

}

export interface RecoveryStatistics {

  total: number;

  pending: number;

  verified: number;

  completed: number;

  expired: number;

}

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  constructor(

    private http: HttpClient,

    private api: ApiService

  ) {}

  getStatistics(): Observable<any> {

    return this.http.get(

      `${this.api.baseUrl}/recovery/admin/requests/statistics`

    );

  }

  getAll(): Observable<any> {

    return this.http.get(

      `${this.api.baseUrl}/recovery/admin/requests`

    );

  }

  getDetails(id: string): Observable<any> {

    return this.http.get(

      `${this.api.baseUrl}/recovery/admin/requests/${id}`

    );

  }

}
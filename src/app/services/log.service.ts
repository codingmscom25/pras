import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface ApiLog {

  id: string;

  endpoint: string;

  method: 'GET' | 'POST' | 'PUT' | 'DELETE';

  client: string;

  status: number;

  responseTime: number;

  createdAt: string;

}

export interface ApiLogDetails extends ApiLog {

  requestBody: string;

  responseBody: string;

  ipAddress: string;

  device: string;

  apiKey: string;

}

export interface LogStatistics {

  totalRequests: number;

  successfulRequests: number;

  failedRequests: number;

  averageResponseTime: number;

}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(

    private http: HttpClient,

    private api: ApiService

  ) {}

  getStatistics(): Observable<any> {

    return this.http.get(

      `${this.api.baseUrl}/admin/logs/statistics`

    );

  }

  getLogs(): Observable<any> {

    return this.http.get(

      `${this.api.baseUrl}/admin/logs`

    );

  }

  getDetails(id: string): Observable<any> {

    return this.http.get(

      `${this.api.baseUrl}/admin/logs/${id}`

    );

  }

}
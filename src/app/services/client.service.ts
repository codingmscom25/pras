import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface ClientRequest {

  name: string;

  baseUrl: string;

}

export interface Client {

  id: string;

  name: string;

  baseUrl: string;

  apiKey: string;

  status: 'ACTIVE' | 'INACTIVE';

  showKey?: boolean;

}

export interface ClientResponse {

  success: boolean;

  message: string;

  data: Client[];

}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(

    private http: HttpClient,

    private api: ApiService

  ) {}

  getAll(): Observable<ClientResponse> {

    return this.http.get<ClientResponse>(

      `${this.api.baseUrl}/admin/clients`

    );

  }

  create(request: ClientRequest) {

    return this.http.post(

      `${this.api.baseUrl}/admin/clients`,

      request

    );

  }

  update(
  id: string,
  request: ClientRequest
) {

  return this.http.put(

    `${this.api.baseUrl}/admin/clients/${id}`,

    request

  );

}

toggleStatus(id: string) {

  return this.http.patch(

    `${this.api.baseUrl}/admin/clients/${id}/status`,

    {}

  );

}

delete(id: string) {

  return this.http.delete(

    `${this.api.baseUrl}/admin/clients/${id}`

  );

}

}
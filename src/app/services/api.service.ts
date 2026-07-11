import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly api = environment.apiUrl;

  constructor(
    protected http: HttpClient
  ) {}

  protected post<T>(url: string, body: unknown) {
    return this.http.post<T>(`${this.api}${url}`, body);
  }

  protected get<T>(url: string) {
    return this.http.get<T>(`${this.api}${url}`);
  }

  protected put<T>(url: string, body: unknown) {
    return this.http.put<T>(`${this.api}${url}`, body);
  }

  protected patch<T>(url: string, body: unknown) {
    return this.http.patch<T>(`${this.api}${url}`, body);
  }

}
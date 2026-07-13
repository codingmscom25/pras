import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface LoginRequest {

  email: string;

  password: string;

}

export interface LoginResponse {

  success: boolean;

  message: string;

  data: {

    accessToken: string;

    refreshToken: string;

    tokenType: string;

  };

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private http: HttpClient,

    private api: ApiService

  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(

      `${this.api.baseUrl}/auth/login`,

      request

    );

  }

}
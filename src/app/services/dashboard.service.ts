import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn:'root'
})
export class DashboardService{

  constructor(

    private http:HttpClient,

    private api:ApiService

  ){}

  getDashboard(){

    return this.http.get(

      `${this.api.baseUrl}/admin/dashboard`

    );

  }

}
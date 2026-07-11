import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly KEY = 'pras_token';

  save(token: string) {

    localStorage.setItem(this.KEY, token);

  }

  get(): string | null {

    return localStorage.getItem(this.KEY);

  }

  clear() {

    localStorage.removeItem(this.KEY);

  }

  isLoggedIn(): boolean {

    return !!this.get();

  }

}
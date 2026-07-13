import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN = 'pras_access_token';

  private readonly REFRESH = 'pras_refresh_token';

  setTokens(
    access: string,
    refresh: string
  ): void {

    localStorage.setItem(this.TOKEN, access);

    localStorage.setItem(this.REFRESH, refresh);

  }

  getToken(): string | null {

    return localStorage.getItem(this.TOKEN);

  }

  getRefreshToken(): string | null {

    return localStorage.getItem(this.REFRESH);

  }

  clear(): void {

    localStorage.removeItem(this.TOKEN);

    localStorage.removeItem(this.REFRESH);

  }

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

}
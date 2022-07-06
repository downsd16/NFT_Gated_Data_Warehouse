import { Injectable } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { MetamaskService } from './metamask.service';
import * as dayjs from 'dayjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private metamaskService: MetamaskService
  ) { }

  isAuthenticated() {
    
  }

  async login() {
    const token = this.metamaskService.metamaskLogin()

    if(token != null) {
      this.setSession(token)
    }
  }

  setSession(token: any) {
    const expiresAt = dayjs().add(token.expiresIn, 'second');

    localStorage.setItem('address_token', token.address);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('address_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return dayjs().isBefore(this.getExpiration());
  }

  isLoggedOut(){
    return !this.isLoggedIn
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    let expiresAt = null;

    if(expiration != null) {
      expiresAt = JSON.parse(expiration);
    }

    return dayjs(expiresAt);
  }
}


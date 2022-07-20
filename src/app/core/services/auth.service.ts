import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { MetamaskService } from './metamask.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isVerified = false
  
  constructor(
    private metamaskService: MetamaskService
  ) {}

  isAuthenticated() {
    this.metamaskService.metamaskLogin().pipe()

    return this.metamaskService.metamaskLogin()
  }
}


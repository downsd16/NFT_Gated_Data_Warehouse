import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { MetamaskService } from '../services/metamask.service';

const TEST1_PUB_KEY = "0xded8a8daddf33f6f11da36ec155effd3d43fa99e";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _router: Router,
    private metamaskService: MetamaskService
    ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      //const data = await this.metamaskService.getWalletData()
      //return (data[1] == TEST1_PUB_KEY)
      return true
  }
  
}

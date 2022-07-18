import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { MetamaskService } from '../services/metamask.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private metamaskService: MetamaskService
    ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.metamaskService.metamaskLogin().pipe(
      map(isAuthenticated => {
        if(!isAuthenticated) 
        { 
          this._router.navigate(['login']);
          return false 
        } else {
          return isAuthenticated;
        }
      }
      ),
      catchError((error: string) => {
        console.log("REACHED ERROR IN MM SERVICE:" + error)
        this._router.navigate(['login']);
        return of(false)
      }));

  }
  
}

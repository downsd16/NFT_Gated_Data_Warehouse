import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { MetamaskService } from '../services/metamask.service';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private metamaskService: MetamaskService,
    private stateService: StateService
    ){}

    state: any;

  /*
  *   Login Function
  *             called when first logging into the application
  *   @dev:     Saves an array of booleans to represent state
  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {

      let hasToken = false;                                     
      console.log("--Validating Ticket--")

      // Call MetaMask Login from Service
      return this.metamaskService.metamaskLogin().pipe(
        map(isAuthenticatedArray => {
          isAuthenticatedArray.forEach((i: boolean) => {
            if (i) { hasToken = true; }
          });

          this.state = isAuthenticatedArray;
          this.stateService.state$.next(this.state);
          console.log("Has Ticket: " + hasToken)
          return hasToken
      }),
      catchError((error) => {
        window.alert("MetaMask Error Please Try Again");
        console.log(error)
        return of(false);
      }));
  }
  
}

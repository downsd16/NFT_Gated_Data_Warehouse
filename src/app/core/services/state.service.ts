import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  state$ = new BehaviorSubject<Array<boolean>>([false, false, false, false]);
}

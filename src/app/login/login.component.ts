import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from '../core/services/metamask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void { }

  async login() {
    this._router.navigate(['home'])
  }

  learn() {
    
  }
}

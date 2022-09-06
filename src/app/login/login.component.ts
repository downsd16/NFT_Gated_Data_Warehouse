import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emptyArray: any = [false,false,false,false]

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void { 
    
  }

  async login() {
    this._router.navigate(['home'])
  }

  learn() {
    
  }
}

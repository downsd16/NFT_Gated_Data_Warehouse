import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from '../core/services/metamask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() account!: string

  constructor(
    private _router: Router,
    private metamaskService: MetamaskService
  ) { }

  ngOnInit(): void { }

  async metamaskHelper() {
    this.metamaskService.metamaskLogin().pipe().subscribe( async (isAuthenticated: boolean) => { if(isAuthenticated) { this._router.navigate(['home']) }})
    //this._router.navigate(['home'])
  }

}

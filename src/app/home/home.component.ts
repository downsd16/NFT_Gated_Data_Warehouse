import { Component, OnInit, Input } from '@angular/core';
import { MetamaskService } from '../core/services/metamask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() account!: string
  @Input() network!: string

  constructor(
    private metamaskService: MetamaskService,
    private _router: Router) { }

  async ngOnInit(): Promise<void> {
    const data = await this.metamaskService.getWalletData();

    this.network = data[0];
    this.account = data[1];
  }

  async connect() {
    this.metamaskService.metamaskLogin().pipe().subscribe( async (verified: any) => {
        
      if(!verified) {
        this._router.navigate(['login'])
      }

    })
  }

}
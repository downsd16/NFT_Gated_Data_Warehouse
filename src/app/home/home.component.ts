import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { MetamaskService } from '../core/services/metamask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@HostListener('unloaded')

export class HomeComponent implements OnInit {

  @Input() account!: string
  @Input() network!: string

  constructor(
    private metamaskService: MetamaskService,
    private elementRef: ElementRef,
    private _router: Router) { }

  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }

  async ngOnInit(): Promise<void> {
    const data = await this.metamaskService.getWalletData()
    const networks = new Map<string, string>([
      ["0x1", "Mainnet"],
      ["0x3", "Ropsten"],
      ["0x4", "Rinkeby"],
      ["0x5", "Goerli"]
    ])
    this.network = networks.get(data[0])!;
    this.account = "0x..." + (data[1]).substring(data[1].length - 4)
  }

  async logout() {
    this._router.navigate(['login'])
  }

  viewData(){
    this._router.navigate(['data'])
  }

  adminConsole() {
    this._router.navigate(['admin'])
  }

  visitMarketplace() {
    window.location.href = ('https://testnets.opensea.io/collection/nonfungibletrust-controller-v2');
  }
}

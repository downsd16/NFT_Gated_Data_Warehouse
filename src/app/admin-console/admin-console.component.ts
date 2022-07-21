import { Component, OnInit } from '@angular/core';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  async pause() {
    this.adminService.pauseContract()
  }
  
  async resume() {
      this.adminService.resumeContract()
  }

  async burn() {
    this.adminService.burnNFT()
  }

  async mint() {
    this.adminService.mintNFT
  }

  async transfer() {
    //this.adminService
  }

  /*
  CONTRACT STATUS:
  https://api.etherscan.io/api
   ?module=contract
   &action=getabi
   &address=0x20e73B4023bBcaBeA040aC529b14A3f807D3d912
   &apikey=U9XTEBB23AC7DTFHZ6UUZDGEP65X5IWRHX

  TRANSACTION HISTORY:
   https://api-rinkeby.etherscan.io/api
   ?module=account
   &action=txlist
   &address=0x20e73B4023bBcaBeA040aC529b14A3f807D3d912
   &startblock=0
   &endblock=99999999
   &sort=asc
   &apikey=U9XTEBB23AC7DTFHZ6UUZDGEP65X5IWRHX
  */
}

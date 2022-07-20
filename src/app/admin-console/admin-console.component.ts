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
}

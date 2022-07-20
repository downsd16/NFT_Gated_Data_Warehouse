import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import { __values } from 'tslib';
import { Router } from '@angular/router';
import detectEthereumProvider  from "@metamask/detect-provider";

const ControllerABI = require('../../../../../backend_nft/artifacts/contracts/controller.sol/accessController.json');
const DEPLOY_ADDRESS = "0x20e73B4023bBcaBeA040aC529b14A3f807D3d912";
const TEST1_PUB_KEY = "0xDeD8a8dADdf33F6F11dA36Ec155EfFD3D43fa99E";
const TEST2_PUB_KEY = "0x61A28d63038eB03CD242BA659201bDe0DCB83C70";

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
    ) {}



  /*
  *   Get Contract Instance Function
  *
  *   @return:    contract instance for the user
  *   @dev:       uses metamask provider (window.ethereum)
  */
  public async getInstance() {
    const ethereum: any = await detectEthereumProvider()
    await ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner()
   
    return new ethers.Contract(
      DEPLOY_ADDRESS,
      ControllerABI.abi,
      signer
    );
  }



  /*
   *   Pause Contract Function
   *
   *   @dev:   Calls 'pause' on chain to test contract pausing
   */
  public async pauseContract() {
    const contractInstanceForUser:any = this.getInstance
    await contractInstanceForUser['pause']().then(() => {
      return true;
    });
  }



/*
   *   Pause Contract Function
   *
   *   @dev:   Calls 'pause' on chain to test contract pausing
   */
public async resumeContract() {
  const contractInstanceForUser: any = this.getInstance
  await contractInstanceForUser['unpause']().then(() => {
    return true;
  });
}



  /*
   *   Burn NFT Function
   *
   *      burns nft for Test2
   */
  public async burnNFT() {
    const contractInstanceForUser: any = this.getInstance
    await contractInstanceForUser['burnNFT'](TEST2_PUB_KEY, 1, 1).then(
      () => {
        return true;
      }
    );
  }



  /*
   *   Mint NFT Function
   *
   *      calls 'mintNFT' on chain to create a new NFT for Test1
   */
  public async mintNFT() {
    const contractInstanceForUser: any = this.getInstance
    await contractInstanceForUser['mintNFT'](TEST1_PUB_KEY, 1, 1).then(
      () => {
        return true;
      }
    );
  }

  
}

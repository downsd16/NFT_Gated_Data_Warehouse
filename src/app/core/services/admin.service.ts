import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import { __values } from 'tslib';
import { Router } from '@angular/router';
import detectEthereumProvider from '@metamask/detect-provider';

const ControllerABI = require('../../../../../backend_nft/artifacts/contracts/controller.sol/accessController.json');
const DEPLOY_ADDRESS = '0x1cE7AA35Ce1a3761ADf9b3A80d4D536c305aEae1';
const TEST1_PUB_KEY = '0xDeD8a8dADdf33F6F11dA36Ec155EfFD3D43fa99E';
const TEST2_PUB_KEY = '0x61A28d63038eB03CD242BA659201bDe0DCB83C70';

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
   *   Pause Contract Function
   *   @dev:   Calls 'pause' on chain to test contract pausing
   */
  public async pauseContract() {
    const ethereum: any = await detectEthereumProvider();
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
    const signer = provider.getSigner();

    const contractInstanceForUser = new ethers.Contract(
      DEPLOY_ADDRESS,
      ControllerABI.abi,
      signer
    );
    await contractInstanceForUser['pause']().then(() => {
      return true;
    });
  }

  /*
   *   Resume Contract Function
   *   @dev:    Calls 'pause' on chain to test contract pausing
   */
  public async resumeContract() {
    const ethereum: any = await detectEthereumProvider();
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
    const signer = provider.getSigner();

    const contractInstanceForUser = new ethers.Contract(
      DEPLOY_ADDRESS,
      ControllerABI.abi,
      signer
    );

    await contractInstanceForUser['unpause']().then(() => {
      return true;
    });
  }

  /*
   *   Burn NFT Function
   *   @dev:    burns nft for Test2 account
   */
  public async burnNFT() {
    const ethereum: any = await detectEthereumProvider();
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
    const signer = provider.getSigner();

    const contractInstanceForUser = new ethers.Contract(
      DEPLOY_ADDRESS,
      ControllerABI.abi,
      signer
    );
    
    await contractInstanceForUser['burnNFT'](TEST2_PUB_KEY, 3, 1).then(() => {
      return true;
    });
  }

  /*
   *   Mint NFT Function
   *   @dev:    calls 'mintNFT' on chain to create a new NFT for Test1
   */
  public async mintNFT() {
    const ethereum: any = await detectEthereumProvider();
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
    const signer = provider.getSigner();

    const contractInstanceForUser = new ethers.Contract(
      DEPLOY_ADDRESS,
      ControllerABI.abi,
      signer
    );

    await contractInstanceForUser['mintNFT'](TEST1_PUB_KEY, 1, 1).then(() => {
      console.log('Minted successfully to: ' + TEST1_PUB_KEY)
      return true
    });
  }
}

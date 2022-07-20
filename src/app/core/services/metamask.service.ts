import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import detectEthereumProvider  from "@metamask/detect-provider";
import { ethers } from 'ethers';
import { __values } from 'tslib';
import { Router } from '@angular/router';
const ControllerABI = require('../../../../../backend_nft/artifacts/contracts/controller.sol/accessController.json');

const WEB_SRVR_URL = 'http://localhost:3003'
const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/k6YWwXNqqI4RjKRe--6p9D4sPQiZJySK"
const DEPLOY_ADDRESS = "0x20e73B4023bBcaBeA040aC529b14A3f807D3d912";
const TEST1_PUB_KEY = "0xDeD8a8dADdf33F6F11dA36Ec155EfFD3D43fa99E";


interface NonceResponse {
  nonce: string;
}

interface VerifyResponse {
  verified: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class MetamaskService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {}

  /*
  *   MetaMask Authentication Function
  *
  *   @dev:   Connects with the backend via http to sign and 
  *           verify wallet using a random nonce 
  */
  metamaskLogin() {

    let ethereum: any;

    return from(detectEthereumProvider()).pipe(

      //1 - Connect to provider if one exists in the window
      switchMap(async (provider) => {
        if(!provider) {
          throw new Error('Please Install MetaMask')
        }

        ethereum = provider;
        
        ethereum.on('accountsChanged', () => {
          this.ngZone.run(() => {
            this.router.navigate(['login'])
          })
        });

        ethereum.on('chainChanged', () => {
          this.ngZone.run(() => {
            this.router.navigate(['login'])
          })
        });

        const address = await ethereum.request({ method: 'eth_requestAccounts' })
        await this.requestNetworkChange(ethereum)

        return address
      }),

      // 2 - Get nonce for signature
      switchMap(() => this.http.post<NonceResponse>(
        `http://localhost:3003/nonce`,
        {
          address: ethereum.selectedAddress,
        }
      )
    ),

    // 3 - Sign Message using nonce
    switchMap(
      async (response) => 
        await ethereum.request({
          method: 'personal_sign',
          params: [
            `0x${this.toHex(response.nonce)}`,
            ethereum.selectedAddress,
          ],
        }
        )
    ),

    // 4 - Send signature to server for verification
    switchMap((sig) => 
        this.http.post<VerifyResponse>(
          `${ WEB_SRVR_URL }/verify`,
          { address: ethereum.selectedAddress, signature: sig }
        )
      ),

    // 5 - Return true if authenticated through both methods
    switchMap(
      async (response) => {
        let hasToken = await this.checkIdentification(ethereum.selectedAddress)
        
        if(response != null && hasToken) {
          const token = (<string>response).split(' ')[1];

          jwt.verify(token, testSecret, (err: any) => {
            if (err) {
                return null;
            }
            
            return token;
          });
        }
        return null;
    })
  );
}

private toHex(stringToConvert: string) {
  return stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}






  /*
  *   Wallet Data Function
  * 
  *   @dev:   Returns the wallet data (network and account)
  */
  public async getWalletData() {
    
    const data: string[] = [];
    const provider: any = await detectEthereumProvider()

    //Get network and address
    const networkId = await provider.request({ method: 'eth_chainId' })
    const addresses = await provider.request({ method: 'eth_requestAccounts' })
    const address = addresses[0]
    
    data.push(networkId)
    data.push(address)

    return data;
  }


  /*
  *   Check Identification Function
  *
  *   @dev:   Calls 'checkId' on chain to authenticate 
  *           currently-connected user
  */
  public async checkIdentification(address: any) {
    let value = false
    const provider = new ethers.providers.JsonRpcProvider(API_URL)
    const signer = new ethers.VoidSigner(address, provider)

    const contractInstanceForUser = new ethers.Contract(
      DEPLOY_ADDRESS,
      ControllerABI.abi,
      signer
    )
      value = await contractInstanceForUser['checkId'](1)
      console.log(value)

    return value
  }



/*
  *   Pause Contract Function
  *
  *   @dev:   Calls 'pause' on chain to test contract pausing            
  */
public async pauseContract() {

  const provider = new ethers.providers.JsonRpcProvider(API_URL)
  const signer = new ethers.Wallet(TEST1_PUB_KEY, provider)

  const contractInstanceForUser = new ethers.Contract(
    DEPLOY_ADDRESS,
    ControllerABI.abi,
    signer
  )

    //const transactionPause = contractInstanceForUser['pause']()
    await contractInstanceForUser['pause']()
    .then(() => {
        return true 
      })
}



/*
  *   Burn NFT Function
  *
  *   @dev:   Calls 'checkId' on chain to authenticate 
  *           currently-connected user
  */
public async burnNFT() {

  const provider = new ethers.providers.JsonRpcProvider(API_URL)
  const signer = new ethers.Wallet(TEST1_PUB_KEY, provider)

  const contractInstanceForUser = new ethers.Contract(
    DEPLOY_ADDRESS,
    ControllerABI.abi,
    signer
  )

    //const transactionPause = contractInstanceForUser['pause']()
    const transactionPause = await contractInstanceForUser['pause']()
    .then(() => {
        return true 
      })
}



  /*
  *   Requests User to Change Network
  *   
  *   @param:   chainId - ID for desired network
  *   @dev:     attemps to change
  */
  public async requestNetworkChange(provider: any) {
    
    //Try to switch or add then switch network
    try {

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x4'                              
        }],
      });
    } catch (error: any) {
      if(error.code == 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
            {
              chainId: '0x7A69',                         
              chainName: 'HardhatNetwork',
              rpcUrl: ['http://127.0.0.1:8545/']         
            },
          ],
          });
        } catch (accError: any) {
          console.error(accError)
        }
      } 
      console.log(error)
    }
  }

}

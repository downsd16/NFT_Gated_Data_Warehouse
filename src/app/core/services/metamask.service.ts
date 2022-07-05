import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import detectEthereumProvider  from "@metamask/detect-provider";
import { ethers } from 'ethers';
import { __values } from 'tslib';
const ControllerABI = require('../../../../../backend_nft/artifacts/contracts/controller.sol/accessController.json');

const url = 'http://localhost:3003'
const DEPLOY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
//const AccessController = JSON.parse(ControllerABI);


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

  constructor(private http: HttpClient) {}

  metamaskLogin() {

    let ethereum: any;

    return from(detectEthereumProvider()).pipe(

      //1 - Connect to provider if one exists in the window
      switchMap(async (provider) => {
        if(!provider) {
          throw new Error('Please Install MetaMask')
        }

        ethereum = provider;

        ethereum.on('accountsChanged', function() {
          console.log("ACCOUNT CHANGE")
        });
        
        ethereum.on('chainChanged', function() {
          console.log("NETWORK CHANGE")
        });
        
        //return await ethereum.request({ method: 'eth_requestAccounts' });
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
        })
    ),

    // 4 - Send signature to server for verification
    switchMap((sig) => 
        this.http.post<VerifyResponse>(
          `${ url }/verify`,
          { address: ethereum.selectedAddress, signature: sig }
        )
      ),

    // 5 - Return the Wallet Data if authenticated
    switchMap(
      async (response) => {
        let hasToken = false;

        if(response.verified) {
          hasToken = await this.checkIdentification(ethereum.selectedAddress)
        }

        return (response.verified && hasToken)
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
    data.push("0x..." + (address).substring(address.length - 4))

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
    
    //const provider = ethers.getDefaultProvider("http://localhost:8545")
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    const signer = provider.getSigner(address)

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
          chainId: '0x7A69'                              
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
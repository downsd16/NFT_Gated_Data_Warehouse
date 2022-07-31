import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StateService } from '../core/services/state.service';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {

  timeout:any = null
  stateArray: any

  displayPartName: string = ""
  currTwelveMonth: number = 0
  currTotalOpenPOValue: number = 0
  currTotalDemandQuantity: number = 0

  displayTwelveMonth: string = "$0"
  displayTotalOpenPOValue: string = "$0"
  displayTotalDemandQuantity: string = "0"

  currencyFormatter: any
  quantityFormatter: any

  listPages = [
    {
      enable: false, 
      title: "Mining ASIC",
      route: "asic"
    },
    {
      enable: false, 
      title: "Camera Module",
      route: "camera"
    },
    {
      enable: false, 
      title: "Microprocessor",
      route: "microp"
    },
    {
      enable: false, 
      title: "Resistor",
      route: "resistor"
    }
  ]

  constructor(
    private stateService: StateService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.stateService.state$.subscribe(
      (data) => {
        data.forEach((value: boolean, index: number) => {
          this.listPages[index].enable = value
        });
      });
      console.log(this.listPages)

      this.currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0,
      });
    
      this.quantityFormatter = new Intl.NumberFormat('ja-JP', { 
        style: 'currency', 
        currency: 'JPY', 
        currencyDisplay: "code" 
      });
  }

  updateValues() {
    
        //Update Values in Model
        this.currTwelveMonth += Math.random()*100
        this.currTotalOpenPOValue += Math.random()*50
        this.currTotalDemandQuantity += Math.random()*10

        //Update Display values
        this.displayTwelveMonth = this.currencyFormatter.format(this.currTwelveMonth)
        this.displayTotalOpenPOValue = this.currencyFormatter.format(this.currTotalOpenPOValue)
        this.displayTotalDemandQuantity = this.quantityFormatter.format(this.currTotalDemandQuantity).replace("JPY", "").trim()
  } 

  updatePart(partName: string) {
    
    this.listPages.forEach((item: any) => {
      if(item.route == partName) {
        this.displayPartName = item.title

        //Update Values in Model
        this.currTwelveMonth = 100000000 * Math.random()
        this.currTotalOpenPOValue = 100000000 * Math.random()
        this.currTotalDemandQuantity = 100000000 * Math.random()
      }
    })
    //this.timeout = setTimeout(this.updateValues, 1000)
    this.updateValues()
  }

  returnHome() {
    this._router.navigate(['home'])
  }

}

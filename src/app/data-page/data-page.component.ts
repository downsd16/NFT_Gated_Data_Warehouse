import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StateService } from '../core/services/state.service';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {

  currentPartName: string = ""
  timeout:any = null
  stateArray: any
  currPartName: string = ""
  currTwelveMonth: string = ""
  currTotalOpenPOValue: string = ""
  currTotalDemandQuantity: string = ""

  currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0,
  });

  quantityFormatter = new Intl.NumberFormat('ja-JP', { 
    style: 'currency', 
    currency: 'JPY', 
    currencyDisplay: "code" 
  });

  listPages = [
    {
      enable: false, 
      title: "Mining ASIC", 
      twelveMonth: 920631220.16,
      totalOpenPOValue: 771366186.81,
      totalDemandQuantity: 758295367.23,
      route: "asic"
    },
    {
      enable: false, 
      title: "Camera Module", 
      twelveMonth: 28934368.12,
      totalOpenPOValue: 24362876.18,
      totalDemandQuantity: 8168954.22,
      route: "camera"
    },
    {
      enable: false, 
      title: "Microprocessor",
      twelveMonth: 1283588281.94,
      totalOpenPOValue: 3984582127.35,
      totalDemandQuantity: 428649322.76, 
      route: "microp"
    },
    {
      enable: false, 
      title: "Resistor", 
      twelveMonth: 2362545835.21,
      totalOpenPOValue: 539648955.33,
      totalDemandQuantity: 132663849.48,
      route: "resistor"
    }
  ]

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.stateService.state$.subscribe(
      (data) => {
        data.forEach((value: boolean, index: number) => {
          this.listPages[index].enable = value
        });
      });
      console.log(this.listPages)
  }

  public updateValues() {
    this.listPages.forEach((item: any) => {
      if(item.route === this.currentPartName) {

        //Update Values in Model
        item.twelveMonth += this.getRand(100)
        item.totalOpenPOValue += this.getRand(9)
        item.totalDemandQuantity += this.getRand(50)

        //Updates Values in View
        this.currPartName += item.title
        this.currTwelveMonth = this.currencyFormatter.format(item.twelveMonth)
        this.currTotalOpenPOValue = this.currencyFormatter.format(item.totalOpenPOValue)
        this.currTotalDemandQuantity = this.quantityFormatter.format(item.totalDemandQuantity).replace("JPY", "").trim()
        this.timeout = setTimeout(this.updateValues, 10000)
      }
    }) 
  }

  async updatePart(partName: string) {
    this.currentPartName = partName
    this.updateValues()
  }

  getRand(value: number) {
    let rand = Math.random()*value
    if(value % 2 == 0) {return rand}
    else { return (Math.random() >= 0.5) ? rand : -rand }
  }
}

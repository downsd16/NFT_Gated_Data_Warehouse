import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StateService } from '../core/services/state.service';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {

  stateArray: any
  currPartName: string = "none"
  currTwelveMonth: string = "none"
  currTotalOpenPOValue: string = "none"
  currTotalDemandQuantity: string = "none"

  listPages = [
    {
      enable: false, 
      title: "Mining ASIC", 
      twelveMonth: "2,000,000",
      totalOpenPOValue: "3,000,000",
      totalDemandQuantity: "400,000,000",
      route: "asic"
    },
    {
      enable: false, 
      title: "Camera Module", 
      twelveMonth: "",
      totalOpenPOValue: "",
      totalDemandQuantity: "",
      route: "camera"
    },
    {
      enable: false, 
      title: "Microprocessor",
      twelveMonth: "",
      totalOpenPOValue: "",
      totalDemandQuantity: "", 
      route: "microp"
    },
    {
      enable: false, 
      title: "Resistor", 
      twelveMonth: "",
      totalOpenPOValue: "",
      totalDemandQuantity: "",
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

  update(partName: any) {
    this.listPages.forEach((item: any) => {
      if(item.route == partName) {
        this.currPartName = item.title
        this.currTwelveMonth = item.twelveMonth
        this.currTotalOpenPOValue = item.totalOpenPOValue
        this.currTotalDemandQuantity = item.totalDemandQuantity
      }
    }) 
  }
}

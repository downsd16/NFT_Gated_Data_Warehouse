import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'data-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() listBool: any;
  
  listPages = [
    {title: "Mining ASICs", route: "data/asic"},
    {title: "Camera Modules", route: "data/camera"},
    {title: "Microprocessors", route: "data/microprocessor"},
    {title: "Resistors", route: "data/resistor"}
  ]

  constructor() { }

  ngOnInit(): void {}


}

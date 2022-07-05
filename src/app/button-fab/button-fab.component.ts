import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-fab',
  templateUrl: './button-fab.component.html',
  styleUrls: ['./button-fab.component.css']
})
export class ButtonFabComponent implements OnInit {

  @Input() icon!: string;
  @Input() color!: string;

  constructor() { }

  ngOnInit(): void {
  }

  async onClick() {}

}

import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})

export class LineGraphComponent implements OnDestroy {
  priceCurrent: number | undefined

  constructor(private http : HttpClient) {  
  }
 
  dataPoints:any[] = [];
  timeout:any = null;
  xValue:number = 1;
  yValue:number = 10;
  newDataCount:number = 10;
  chart: any;
 
  chartOptions = {
    theme: "light2",
    title: {
      text: "Ethereum Price (USD)"
    },
    axisY:{    
      valueFormatString:  "$##,###.##"
    },
    data: [{
      type: "line",
      xValueType: "dateTime",
      yValueType: "usd",
      dataPoints: this.dataPoints
    }]
  }
 
  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateData();
  }
 
  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
 
  updateData = () => {
    this.http.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
     { responseType: 'json' }).subscribe(this.addData);
  }
 
  addData = (data:any) => {
    this.priceCurrent = data.ethereum.usd + this.randomizer()

    this.dataPoints.push({
      x: new Date(), 
      y: this.priceCurrent});

    this.newDataCount = 1;
    this.chart.render();
    this.timeout = setTimeout(this.updateData, 1000);
  }

  randomizer() {
    let rand = Math.random()*100
    return(Math.random() >= 0.5 ? -rand : rand)
  }
}
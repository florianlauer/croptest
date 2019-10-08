import { ApiService } from './../api.service';
import { Measures } from './../model/measures';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'Chart.js';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  chart: any;
  subscription: Subscription;
  measures: Measures;
  tempData: number[] = new Array();
  labels: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.subscription = this.apiService.getRainCropStats().subscribe((m: Measures) => {
      this.measures = m;
      console.log(this.measures.data);
      this.measures.data.forEach((element, i) => {
        this.tempData.push(element.TEMPERATURE.value);
        this.labels.push(i.toString());
      });
      console.log(this.tempData);
      console.log(this.labels);

        this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: 'Temperature',
                data: this.tempData,
                borderColor: '#00AEFF',
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true,
              }]
            }
          }
        });
    });
  }





}

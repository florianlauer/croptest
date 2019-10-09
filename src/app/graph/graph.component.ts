import { ApiService } from './../api.service';
import { Measures } from './../model/measures';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Chart } from 'Chart.js';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  chart: any;
  subscription: Subscription;
  measures: Measures;
  tempData: number[] = new Array();
  labels: any[] = [];
  measureTypes = ['TEMPERATURE', 'RELATIVE_HUMIDITY', 'WET_TEMPERATURE', 'RAIN_FALL'];
  selectedValue = 'TEMPERATURE';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.subscription = this.apiService.getRainCropStats(this.selectedValue).subscribe((m: Measures) => {
      this.measures = m;
      this.measures.data.forEach((element, i) => {
        this.tempData.push(element[this.selectedValue].value);
        this.labels.push(i.toString());
      });
      this.buildChart();
    });
  }

  refreshCall(value: string) {
    this.tempData = [];
    this.selectedValue = value;
    this.subscription = this.apiService.getRainCropStats(this.selectedValue).subscribe((m: Measures) => {
      this.measures = m;
      this.measures.data.forEach(element => {
        this.tempData.push(element[this.selectedValue].value);
      });
      this.buildChart();
    });
  }

  buildChart() {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.selectedValue,
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

import { ApiService } from './../api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Measures } from '../model/measures';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  measures: Measures;
  data: any[] = [];
  measureTypes = ['TEMPERATURE', 'RELATIVE_HUMIDITY', 'WET_TEMPERATURE', 'RAIN_FALL'];
  selectedValue = 'TEMPERATURE';

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.subscription = this.apiService.getRainCropStats(this.selectedValue).subscribe((m: Measures) => {
      this.measures = m;
      this.measures.data.forEach(element => {
        this.data.push(element[this.selectedValue].value);
      });
    });
  }

  refreshCall(value: string) {
    this.data = [];
    this.subscription = this.apiService.getRainCropStats(value).subscribe((m: Measures) => {
      this.measures = m;
      this.measures.data.forEach(element => {
        this.data.push(element[value].value);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

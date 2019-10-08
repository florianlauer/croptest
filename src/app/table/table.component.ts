import { Device } from './../model/device';
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

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.subscription = this.apiService.getRainCropStats().subscribe((m: Measures) => {
      this.measures = m;
      console.log(this.measures.data);
    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

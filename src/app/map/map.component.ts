import { Device } from './../model/device';
import { ApiService } from './../api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  devices: Device[] = [];

  numberMarkerImg = {
    url: 'assets/sensor.svg',
    scaledSize: { height: 48, width: 48 },
    labelOrigin: { x: 90, y: 20 }
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.subscription = this.apiService.getDevices().subscribe((data: Device[]) => {
      this.devices = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

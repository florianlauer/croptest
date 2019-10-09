import { Device } from './model/device';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Measures } from './model/measures';



/* Service which retrieves data from API */


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndpoint = 'https://api.sencrop.com/v1/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    'Authorization': 'Bearer 2b5e21450c81d52d4e3a77331347883d196d61ca155a223ca9e0608008455f8a8675daed220c04de9b19358fc65988d311365a5b2b1ed5297c5e2d9fada04d5b2a8c0dc33bc767caa5dc3b4b5d202c50fbdc0bbcf2b50e295fadfebd74d144656e8b67bce8abce48573908938a418811ccaa125a506799bd62b36eba299825ac'
  });
  private userId = 64779;
  private rainCropId = 5551;
  private windCropId = 1117;

  constructor(private httpClient: HttpClient) { }

  getUrl(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  getDevices(): Observable<Device[]> {

    return this.httpClient.get<any>(`${this.apiEndpoint}/users/${this.userId}/devices`, { headers: this.headers }).pipe(
      map(data => Object.values(data.devices))
    );
  }

  getRainCropStats(measureType?: string): Observable<Measures> {

    if (measureType === undefined) {
        measureType = 'TEMPERATURE';
    }
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(`${this.apiEndpoint}/users/${this.userId}/devices/${this.rainCropId}/statistics?startDate=2019-10-05T11:49:48Z&endDate=2019-10-06T11:49:48Z&measures=${measureType}`, { headers: this.headers }).pipe(
      map(data => data.measures)
    );
  }

}

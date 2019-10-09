import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [MapComponent],
      providers: [
        MockMapsAPILoader
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

export class MockMapsAPILoader {
  public load(): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }
}

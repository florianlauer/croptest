import { GraphComponent } from './graph/graph.component';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tables',
    pathMatch: 'full'
  },
  {
    path: 'tables',
    component: TableComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'graphs',
    component: GraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

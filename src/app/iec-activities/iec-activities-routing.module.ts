import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlipbookChartsComponent } from './flipbook-charts/flipbook-charts.component';
import { HoardingsBannersComponent } from './hoardings-banners/hoardings-banners.component';
import { IecActivitiesComponent } from './iec-activities.component';
import { RadioJinglesComponent } from './radio-jingles/radio-jingles.component';
import { TvSportsComponent } from './tv-sports/tv-sports.component';
import { WallPaintingsComponent } from './wall-paintings/wall-paintings.component';

const routes: Routes = [
  { path: '', component: IecActivitiesComponent },
  { path: 'wall-paintings', component: WallPaintingsComponent },
  { path: 'hoardings-banners', component: HoardingsBannersComponent },
  { path: 'radio-jingles', component: RadioJinglesComponent },
  { path: 'tv-spots', component: TvSportsComponent },
  { path: 'flipbooks-charts', component: FlipbookChartsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IecActivitiesRoutingModule { }

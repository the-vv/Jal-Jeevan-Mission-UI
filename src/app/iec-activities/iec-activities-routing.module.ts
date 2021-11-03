import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoardingsBannersComponent } from './hoardings-banners/hoardings-banners.component';
import { IecActivitiesComponent } from './iec-activities.component';
import { WallPaintingsComponent } from './wall-paintings/wall-paintings.component';

const routes: Routes = [
  { path: '', component: IecActivitiesComponent },
  { path: 'wall-paintings', component: WallPaintingsComponent },
  { path: 'hoardings-banners', component: HoardingsBannersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IecActivitiesRoutingModule { }

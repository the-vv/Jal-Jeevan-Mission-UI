import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WqmIecComponent } from './wqm-iec.component';

const routes: Routes = [{ path: '', component: WqmIecComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WqmIecRoutingModule { }

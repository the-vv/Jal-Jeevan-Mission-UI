import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngagementIsaComponent } from './engagement-isa.component';

const routes: Routes = [{ path: '', component: EngagementIsaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngagementIsaRoutingModule { }

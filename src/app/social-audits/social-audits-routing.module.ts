import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialAuditsComponent } from './social-audits.component';

const routes: Routes = [{ path: '', component: SocialAuditsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialAuditsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialAuditsComponent } from './social-audits.component';

const routes: Routes = [
  { path: '', redirectTo: 'social-audit-reports', pathMatch: 'full' },
  { path: 'social-audit-reports', component: SocialAuditsComponent },
  { path: '**', redirectTo: 'social-audit-reports', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialAuditsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsaPositioningComponent } from '../planningPhase/isa-positioning/isa-positioning.component';
import { AssistingNodalAgencyComponent } from './assisting-nodal-agency/assisting-nodal-agency.component';
import { DevelopConvergancePlanComponent } from './develop-convergance-plan/develop-convergance-plan.component';
import { EngagementIsaComponent } from './engagement-isa.component';
import { HandholdSupportGpGpwcGpComponent } from './handhold-support-gp-gpwc-gp/handhold-support-gp-gpwc-gp.component';
import { OrientationToGpBoardComponent } from './orientation-to-gp-board/orientation-to-gp-board.component';
import { SpecialOrientationTrainingComponent } from './special-orientation-training/special-orientation-training.component';
import { SupportServicesGpComponent } from './support-services-gp/support-services-gp.component';

const routes: Routes = [
  { path: '', component: EngagementIsaComponent },
  { path: 'isa-positioning', component: IsaPositioningComponent },
  { path: 'orientation-to-gp-board-members', component: OrientationToGpBoardComponent },
  { path: 'special-orientation-training', component: SpecialOrientationTrainingComponent },
  { path: 'develop-covergence-plan-gwr-rwh', component: DevelopConvergancePlanComponent },
  { path: 'assisting-model-agency-gp-gpwc', component: AssistingNodalAgencyComponent },
  { path: 'support-services-to-gp', component: SupportServicesGpComponent },
  { path: 'handhold-support-gp-gpwc-gp-level-beneficiary-committee', component: HandholdSupportGpGpwcGpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngagementIsaRoutingModule { }

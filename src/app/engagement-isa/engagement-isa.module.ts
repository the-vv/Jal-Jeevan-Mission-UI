import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementIsaRoutingModule } from './engagement-isa-routing.module';
import { EngagementIsaComponent } from './engagement-isa.component';
import { IsaPositioningComponent } from './isa-positioning/isa-positioning.component';
import { OrientationToGpBoardComponent } from './orientation-to-gp-board/orientation-to-gp-board.component';
import { SpecialOrientationTrainingComponent } from './special-orientation-training/special-orientation-training.component';
import { DevelopConvergancePlanComponent } from './develop-convergance-plan/develop-convergance-plan.component';
import { AssistingNodalAgencyComponent } from './assisting-nodal-agency/assisting-nodal-agency.component';
import { SupportServicesGpComponent } from './support-services-gp/support-services-gp.component';
import { HandholdSupportGpGpwcGpComponent } from './handhold-support-gp-gpwc-gp/handhold-support-gp-gpwc-gp.component';


@NgModule({
  declarations: [
    EngagementIsaComponent,
    IsaPositioningComponent,
    OrientationToGpBoardComponent,
    SpecialOrientationTrainingComponent,
    DevelopConvergancePlanComponent,
    AssistingNodalAgencyComponent,
    SupportServicesGpComponent,
    HandholdSupportGpGpwcGpComponent
  ],
  imports: [
    CommonModule,
    EngagementIsaRoutingModule
  ]
})
export class EngagementIsaModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';


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
    EngagementIsaRoutingModule,
    SharedModule, 
    MatIconModule,  
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatCardModule,
    ConfirmDialogModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [    
    EngagementIsaComponent,
    IsaPositioningComponent,
    OrientationToGpBoardComponent,
    SpecialOrientationTrainingComponent,
    DevelopConvergancePlanComponent,
    AssistingNodalAgencyComponent,
    SupportServicesGpComponent,
    HandholdSupportGpGpwcGpComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: environment.DATE_FORMATS },
    ConfirmationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EngagementIsaModule { }

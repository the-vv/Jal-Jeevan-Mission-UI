import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacityBuildingActivitiesRoutingModule } from './capacity-building-activities-routing.module';
import { CapacityBuildingActivitiesComponent } from './capacity-building-activities.component';
import { VwscPaniSmithiComponent } from './vwsc-pani-smithi/vwsc-pani-smithi.component';
import { KeyStakeHoldersBlockComponent } from './key-stake-holders-block/key-stake-holders-block.component';
import { KeyStakeHoldersGpVillageComponent } from './key-stake-holders-gp-village/key-stake-holders-gp-village.component';
import { CapacityBuildingMaterialComponent } from './capacity-building-material/capacity-building-material.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModulesModule } from '../common.module';
import { ConfirmationService } from 'primeng/api';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    CapacityBuildingActivitiesComponent,
    VwscPaniSmithiComponent,
    KeyStakeHoldersBlockComponent,
    KeyStakeHoldersGpVillageComponent,
    CapacityBuildingMaterialComponent
  ],
  imports: [
    CommonModule,
    CapacityBuildingActivitiesRoutingModule,
    SharedModule,
    CommonModulesModule
  ],
  exports: [    
    VwscPaniSmithiComponent,
    KeyStakeHoldersBlockComponent,
    KeyStakeHoldersGpVillageComponent,
    CapacityBuildingMaterialComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: environment.DATE_FORMATS },
    ConfirmationService
  ]
})
export class CapacityBuildingActivitiesModule { }

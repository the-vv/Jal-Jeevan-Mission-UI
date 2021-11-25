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
    ConfirmationService
  ]
})
export class CapacityBuildingActivitiesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacityBuildingActivitiesRoutingModule } from './capacity-building-activities-routing.module';
import { CapacityBuildingActivitiesComponent } from './capacity-building-activities.component';
import { VwscPaniSmithiComponent } from './vwsc-pani-smithi/vwsc-pani-smithi.component';
import { KeyStakeHoldersBlockComponent } from './key-stake-holders-block/key-stake-holders-block.component';
import { KeyStakeHoldersGpVillageComponent } from './key-stake-holders-gp-village/key-stake-holders-gp-village.component';
import { CapacityBuildingMaterialComponent } from './capacity-building-material/capacity-building-material.component';


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
    CapacityBuildingActivitiesRoutingModule
  ]
})
export class CapacityBuildingActivitiesModule { }

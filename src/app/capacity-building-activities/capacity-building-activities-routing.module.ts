import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapacityBuildingActivitiesComponent } from './capacity-building-activities.component';
import { CapacityBuildingMaterialComponent } from './capacity-building-material/capacity-building-material.component';
import { KeyStakeHoldersBlockComponent } from './key-stake-holders-block/key-stake-holders-block.component';
import { KeyStakeHoldersGpVillageComponent } from './key-stake-holders-gp-village/key-stake-holders-gp-village.component';
import { VwscPaniSmithiComponent } from './vwsc-pani-smithi/vwsc-pani-smithi.component';

const routes: Routes = [
  { path: '', component: CapacityBuildingActivitiesComponent },
  { path: 'vwscs-pani-samithi-etc', component: VwscPaniSmithiComponent },
  { path: 'key-stakeholders-block-level', component: KeyStakeHoldersBlockComponent },
  { path: 'key-stakeholders-gp-village-level', component: KeyStakeHoldersGpVillageComponent },
  { path: 'capacity-building-material-preparation', component: CapacityBuildingMaterialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityBuildingActivitiesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioVisualPublicityComponent } from './audio-visual-publicity/audio-visual-publicity.component';
import { AwarenessGenerationWaterComponent } from './awareness-generation-water/awareness-generation-water.component';
import { BehavioralChangeComponent } from './behavioral-change/behavioral-change.component';
import { DisplayWaterQualityComponent } from './display-water-quality/display-water-quality.component';
import { SlogansGroupmeetingComponent } from './slogans-groupmeeting/slogans-groupmeeting.component';
import { WallWritingPromotingComponent } from './wall-writing-promoting/wall-writing-promoting.component';
import { WaterSafetyPlpanningComponent } from './water-safety-plpanning/water-safety-plpanning.component';
import { WqmIecComponent } from './wqm-iec.component';

const routes: Routes = [
  { path: '', component: WqmIecComponent },
  { path: 'display-water-quality-testing', component: DisplayWaterQualityComponent },
  { path: 'awareness-generation-water-quality', component: AwarenessGenerationWaterComponent },
  { path: 'water-safety-plannig', component: WaterSafetyPlpanningComponent },
  { path: 'behavioral-change-communication', component: BehavioralChangeComponent },
  { path: 'audio-visual-publicity', component: AudioVisualPublicityComponent },
  { path: 'wall-writing-promoting-tapwater', component: WallWritingPromotingComponent },
  { path: 'slogans-group-meeting-streetplays', component: SlogansGroupmeetingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WqmIecRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WqmIecRoutingModule } from './wqm-iec-routing.module';
import { WqmIecComponent } from './wqm-iec.component';
import { DisplayWaterQualityComponent } from './display-water-quality/display-water-quality.component';
import { AwarenessGenerationWaterComponent } from './awareness-generation-water/awareness-generation-water.component';
import { WaterSafetyPlpanningComponent } from './water-safety-plpanning/water-safety-plpanning.component';
import { BehavioralChangeComponent } from './behavioral-change/behavioral-change.component';
import { AudioVisualPublicityComponent } from './audio-visual-publicity/audio-visual-publicity.component';
import { WallWritingPromotingComponent } from './wall-writing-promoting/wall-writing-promoting.component';
import { SlogansGroupmeetingComponent } from './slogans-groupmeeting/slogans-groupmeeting.component';


@NgModule({
  declarations: [
    WqmIecComponent,
    DisplayWaterQualityComponent,
    AwarenessGenerationWaterComponent,
    WaterSafetyPlpanningComponent,
    BehavioralChangeComponent,
    AudioVisualPublicityComponent,
    WallWritingPromotingComponent,
    SlogansGroupmeetingComponent
  ],
  imports: [
    CommonModule,
    WqmIecRoutingModule
  ]
})
export class WqmIecModule { }
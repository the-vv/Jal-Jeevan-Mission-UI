import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnganawadiComponent } from './anganawadi/anganawadi.component';
import { AnnouncementVansComponent } from './announcement-vans/announcement-vans.component';
import { ConferenceInnovationEventsComponent } from './conference-innovation-events/conference-innovation-events.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { FlipbookChartsComponent } from './flipbook-charts/flipbook-charts.component';
import { FolksongsKalajathaComponent } from './folksongs-kalajatha/folksongs-kalajatha.component';
import { GpBuldingsComponent } from './gp-buldings/gp-buldings.component';
import { GramasabhasDevelopmentSeminarComponent } from './gramasabhas-development-seminar/gramasabhas-development-seminar.component';
import { HoardingsBannersComponent } from './hoardings-banners/hoardings-banners.component';
import { IecActivitiesComponent } from './iec-activities.component';
import { IecMaterialPreperationComponent } from './iec-material-preperation/iec-material-preperation.component';
import { IpcActivitiesComponent } from './ipc-activities/ipc-activities.component';
import { LaborotariesComponent } from './laborotaries/laborotaries.component';
import { NukkadNatakDramaStreetplayComponent } from './nukkad-natak-drama-streetplay/nukkad-natak-drama-streetplay.component';
import { OtherActivitiesComponent } from './other-activities/other-activities.component';
import { OthersComponent } from './others/others.component';
import { PheOfficesComponent } from './phe-offices/phe-offices.component';
import { PostersTouristLocationsComponent } from './posters-tourist-locations/posters-tourist-locations.component';
import { PraActivitiesComponent } from './pra-activities/pra-activities.component';
import { RadioJinglesComponent } from './radio-jingles/radio-jingles.component';
import { RalliesComponent } from './rallies/rallies.component';
import { SchoolCompetitionsComponent } from './school-competitions/school-competitions.component';
import { SchoolsComponent } from './schools/schools.component';
import { ShgInvolvementComponent } from './shg-involvement/shg-involvement.component';
import { TvSportsComponent } from './tv-sports/tv-sports.component';
import { VapPreperationApprovalComponent } from './vap-preperation-approval/vap-preperation-approval.component';
import { WallPaintingsComponent } from './wall-paintings/wall-paintings.component';
import { WaterAuditBudgetComponent } from './water-audit-budget/water-audit-budget.component';
import { WaterResourceMappingComponent } from './water-resource-mapping/water-resource-mapping.component';
import { WaterSafetyPlanningComponent } from './water-safety-planning/water-safety-planning.component';
import { WorldWaterDayComponent } from './world-water-day/world-water-day.component';

const routes: Routes = [
  { path: '', component: IecActivitiesComponent },
  { path: 'wall-paintings', component: WallPaintingsComponent },
  { path: 'hoardings-banners', component: HoardingsBannersComponent },
  { path: 'radio-jingles', component: RadioJinglesComponent },
  { path: 'tv-spots', component: TvSportsComponent },
  { path: 'flipbooks-charts', component: FlipbookChartsComponent },
  { path: 'posters-tourist-locations', component: PostersTouristLocationsComponent },
  { path: 'schools', component: SchoolsComponent },
  { path: 'anganawadi-centers', component: AnganawadiComponent },
  { path: 'gp-buildings', component: GpBuldingsComponent },
  { path: 'laborotaries', component: LaborotariesComponent },
  { path: 'phe-offices', component: PheOfficesComponent },
  { path: 'announcement-vans', component: AnnouncementVansComponent },
  { path: 'other-activities', component: OtherActivitiesComponent },
  { path: 'water-resource-mapping-exercise', component: WaterResourceMappingComponent },
  { path: 'water-audit-budget-exercise', component: WaterAuditBudgetComponent },
  { path: 'nukkad-natak-drama-streetplay', component: NukkadNatakDramaStreetplayComponent },
  { path: 'folksongs-kalajatha', component: FolksongsKalajathaComponent },
  { path: 'rallies', component: RalliesComponent },
  { path: 'grama-sabhas-development-seminar', component: GramasabhasDevelopmentSeminarComponent },
  { path: 'vap-preperation-approval', component: VapPreperationApprovalComponent },
  { path: 'pra-activities', component: PraActivitiesComponent },
  { path: 'school-competitions', component: SchoolCompetitionsComponent },
  { path: 'shg-involvement', component: ShgInvolvementComponent },
  { path: 'water-safety-planning-exercise', component: WaterSafetyPlanningComponent },
  { path: 'others', component: OthersComponent },
  { path: 'world-water-day-events', component: WorldWaterDayComponent },
  { path: 'exhibitions', component: ExhibitionsComponent },
  { path: 'conference-innovation-events', component: ConferenceInnovationEventsComponent },
  { path: 'ipc-activities', component: IpcActivitiesComponent },
  { path: 'iec-material-preperation-production-dissemination', component: IecMaterialPreperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IecActivitiesRoutingModule { }

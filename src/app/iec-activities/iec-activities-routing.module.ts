import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnganawadiComponent } from './anganawadi/anganawadi.component';
import { AnnouncementVansComponent } from './announcement-vans/announcement-vans.component';
import { FlipbookChartsComponent } from './flipbook-charts/flipbook-charts.component';
import { FolksongsKalajathaComponent } from './folksongs-kalajatha/folksongs-kalajatha.component';
import { GpBuldingsComponent } from './gp-buldings/gp-buldings.component';
import { HoardingsBannersComponent } from './hoardings-banners/hoardings-banners.component';
import { IecActivitiesComponent } from './iec-activities.component';
import { LaborotariesComponent } from './laborotaries/laborotaries.component';
import { NukkadNatakDramaStreetplayComponent } from './nukkad-natak-drama-streetplay/nukkad-natak-drama-streetplay.component';
import { OtherActivitiesComponent } from './other-activities/other-activities.component';
import { PheOfficesComponent } from './phe-offices/phe-offices.component';
import { PostersTouristLocationsComponent } from './posters-tourist-locations/posters-tourist-locations.component';
import { RadioJinglesComponent } from './radio-jingles/radio-jingles.component';
import { SchoolsComponent } from './schools/schools.component';
import { TvSportsComponent } from './tv-sports/tv-sports.component';
import { WallPaintingsComponent } from './wall-paintings/wall-paintings.component';
import { WaterAuditBudgetComponent } from './water-audit-budget/water-audit-budget.component';
import { WaterResourceMappingComponent } from './water-resource-mapping/water-resource-mapping.component';

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
  { path: 'gpbuildings', component: GpBuldingsComponent },
  { path: 'laborotaries', component: LaborotariesComponent },
  { path: 'phe-offices', component: PheOfficesComponent },
  { path: 'announcement-vans', component: AnnouncementVansComponent },
  { path: 'other-activities', component: OtherActivitiesComponent },
  { path: 'water-resource-mapping-exercise', component: WaterResourceMappingComponent },
  { path: 'water-audit-budget-exercise', component: WaterAuditBudgetComponent },
  { path: 'nukkad-natak-drama-streetplay', component: NukkadNatakDramaStreetplayComponent },
  { path: 'folksongs-kalajatha', component: FolksongsKalajathaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IecActivitiesRoutingModule { }

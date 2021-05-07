import { BrowserModule,} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule,} from '@angular/platform-browser/animations';

// Angular Material Imports 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './services/data.service';
import { DistrictComponent } from './district/district.component';
import { FormsModule } from '@angular/forms';
import { GpanchayathComponent } from './gpanchayath/gpanchayath.component';
import { PhaseSelectionComponent } from './phase-selection/phase-selection.component';
import { PhaseComponentsComponent } from './phase-components/phase-components.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DistrictComponent,
    GpanchayathComponent,
    PhaseSelectionComponent,
    PhaseComponentsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }

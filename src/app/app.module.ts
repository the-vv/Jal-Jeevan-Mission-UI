import { BrowserModule, } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

import { NgxSpinnerModule } from "ngx-spinner";

// Angular Material Imports 
import {
  MatRippleModule, MAT_DATE_LOCALE
} from '@angular/material/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';

// PrimeNg Imports
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './services/data.service';
import { DistrictComponent } from './district/district.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GpanchayathComponent } from './gpanchayath/gpanchayath.component';
import { PhaseSelectionComponent } from './phase-selection/phase-selection.component';
import { PhaseComponentsComponent } from './phase-components/phase-components.component';
import { LoginComponent } from './login/login.component';
import { RestapiService } from './services/restapi.service';
import { UserService } from './services/user.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { SpinnerService } from './services/spinner.service';
import { MessageService } from 'primeng/api';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WardDetailsComponent } from './ward-details/ward-details.component';
import { RippleModule } from 'primeng/ripple';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ErrorHandlerService } from './services/error-handler.service';
import { CommonModulesModule } from './common.module';
import { PwaService } from './services/pwa-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DistrictComponent,
    GpanchayathComponent,
    PhaseSelectionComponent,
    PhaseComponentsComponent,
    LoginComponent,
    NotfoundComponent,
    SidebarComponent,
    WardDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatRippleModule,
    ReactiveFormsModule,
    MenuModule,
    TieredMenuModule,
    LayoutModule,
    PanelMenuModule,
    BreadcrumbModule,
    MatSnackBarModule,
    MatExpansionModule,
    ButtonModule,
    NgxSpinnerModule,
    ToastModule,
    MatSidenavModule,
    MatBadgeModule,
    RippleModule,
    CommonModulesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ButtonModule
  ],
  providers: [
    DataService,
    RestapiService,
    UserService,
    MessageService,
    DatePipe,
    PwaService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE],  },
    // { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerService, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
  exports: [
    CommonModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

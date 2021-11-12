import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { WardDetailsComponent } from './ward-details/ward-details.component';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactDetailsComponent } from './shared/contact-details/contact-details.component';
import { PrimeNGConfig } from 'primeng/api';
import { AdminVerifyComponent } from './shared/admin-verify/admin-verify.component';
import { environment } from 'src/environments/environment';

// import Darkmode from 'darkmode-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public configData: any = environment;

  constructor(
    public user: UserService,
    public data: DataService,
    private dialog: MatDialog,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private primengConfig: PrimeNGConfig
  ) {

  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    const darkModeptions = {
      // bottom: '64px', // default: '32px'
      // right: 'unset', // default: '32px'
      // left: '32px', // default: 'unset'
      time: '0.5s', // default: '0.3s'
      mixColor: '#fff', // default: '#fff'
      backgroundColor: '#fff',  // default: '#fff'
      buttonColorDark: '#aaa',  // default: '#100f2c'
      buttonColorLight: '#fff', // default: '#fff'
      saveInCookies: false, // default: true,
      label: 'Dark Mode', // default: ''
      autoMatchOsTheme: true // default: true
    }
    // new Darkmode(darkModeptions).showWidget();

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.spinnerService.show('httpSpinner')
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinnerService.hide('httpSpinner')
      }
    });
  }

  openContactDialoge() {
    this.dialog.open(ContactDetailsComponent, {
      disableClose: true
    })
  }

  openWardDialoge() {
    this.dialog.open(WardDetailsComponent, {
      disableClose: true
    })
  }

  isPhasePage() {
    return !(
      this.router.url.includes('/district') ||
      this.router.url.includes('/grama-panchayath') ||
      this.router.url.includes('/calendar') ||
      this.router.url.includes('/report')
    )
  }

  adminVerify() {
    if (this.user.isVerifiedAdmin || !environment.production) {
      this.router.navigate(['/admin/administration'])
    }
    else {
      this.dialog.open(AdminVerifyComponent, {
        disableClose: true
      })
    }
  }

}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from './data.service';
import { RestapiService } from './restapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(
    private rest: RestapiService,
    private dataService: DataService,
    private snackbar: MatSnackBar,
    public loaderService: NgxSpinnerService
  ) { }

  resolve() {
    return new Promise((resolve, reject) => {
      this.loaderService.show('httpSpinner');
      this.rest.getGpInfo().subscribe(
        (data) => {
          this.dataService.allDataWithCountData = data.gps;
          this.dataService.appName = data.name;
          this.loaderService.hide('httpSpinner')
          resolve(true);
        },
        err => {      
          this.loaderService.hide('httpSpinner')    
          this.snackbar.open(err.error.message || err.statusText, 'Dismiss', { duration: 5000, panelClass: 'bg-danger' });
        }
      );
    });
  }
}

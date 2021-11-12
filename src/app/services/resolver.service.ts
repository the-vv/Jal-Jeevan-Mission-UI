import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from './data.service';
import { RestapiService } from './restapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(
    private rest: RestapiService,
    private dataService: DataService,
    private snackbar: MatSnackBar
  ) { }

  resolve() {
    return new Promise((resolve, reject) => {
      this.rest.getGpInfo().subscribe(
        (data) => {
          this.dataService.allDataWithCountData = data.gps;
          this.dataService.appName = data.name
          resolve(true);
        },
        err => {          
          this.snackbar.open(err.error.message || err.statusText, 'Dismiss', { duration: 5000, panelClass: 'bg-danger' });
        }
      );
    });
  }
}

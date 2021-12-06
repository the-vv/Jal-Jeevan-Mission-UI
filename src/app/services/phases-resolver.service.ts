import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resolve } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './data.service';
import { RestapiService } from './restapi.service';

@Injectable({
  providedIn: 'root'
})
export class PhasesResolverService implements Resolve<any> {

  constructor(
    private rest: RestapiService,
    private data: DataService,
    private snackBar: MatSnackBar,
    public loaderService: NgxSpinnerService
  ) { }

  resolve() {
    return new Promise((resolve, reject) => {
      this.loaderService.show('httpSpinner');
      this.rest.getWard(this.data.selectedDetails).subscribe(res => {
        if (res === null) {
          this.data.wardConfigData = {
            category: this.data.selectedDetails,
            names: []
          }
        } else {
          this.data.wardConfigData = res;
        }
        resolve(true);
      },
        err => {
          this.loaderService.hide('httpSpinner')
          this.snackBar.open('Error fetching Configurations, Please Try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
        }
      );
    });
  }
}

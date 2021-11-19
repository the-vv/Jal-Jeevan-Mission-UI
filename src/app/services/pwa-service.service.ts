import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  public promptEvent: any = undefined;
  public isPwaMode: boolean = false;

  constructor(
    private updates: SwUpdate,
    private snackbar: MatSnackBar,
  ) {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isPwaMode = true;
    }
    this.updates.available.subscribe(event => {
      this.snackbar.open('An update is available', 'Update Now', {
        duration: 30000,
        panelClass: ['bg-primary', 'text-white']
      }).onAction().subscribe(() => {
        updates.activateUpdate().then(() => document.location.reload());
      });
    });
    updates.unrecoverable.subscribe(event => {
      this.snackbar.open('App Crashed. Please Refresh', 'Refresh Now', {
        duration: 100000,
        panelClass: ['bg-danger', 'text-white']
      }).onAction().subscribe(() => {
        document.location.reload();
      });
    });
  }

  installPWA() {
    this.promptEvent?.prompt()
    this.promptEvent?.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        this.snackbar.open('Installed Successfully', 'Dismiss', {
          duration: 5000,
          panelClass: ['bg-success', 'text-white']
        })
        this.promptEvent = undefined;
        this.isPwaMode = true;
      } else {
        this.snackbar.open('Installation Failed', 'Dismiss', {
          duration: 5000,
          panelClass: ['bg-danger', 'text-white']
        })
      }
    })
  }
}

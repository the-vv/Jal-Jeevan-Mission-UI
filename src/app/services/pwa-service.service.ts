import { ApplicationRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { concat, interval } from 'rxjs';
import { first, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PwaService {

  public promptEvent: any = undefined;
  public isPwaMode: boolean = false;
  public isOnline: boolean = true;
  private onceOffline: boolean = false;

  constructor(
    private updates: SwUpdate,
    private snackbar: MatSnackBar,
    appRef: ApplicationRef
  ) {
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());

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
    this.checkOnline().subscribe(v => {
      this.isOnline = v;
      if (!v) {
        this.onceOffline = true;
        this.snackbar.open('Network unavailable, Please connect to a network', 'Dismiss', {
          duration: 60000, panelClass: ['bg-danger', 'text-white']
        })
      }
      else if(this.onceOffline) {
        this.snackbar.open('Network connection established', 'Dismiss', {
          duration: 5000, panelClass: ['bg-success', 'text-white']
        })
      }
    })
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

  checkOnline() {
      return merge<boolean>(
        fromEvent(window, 'offline').pipe(map(() => false)),
        fromEvent(window, 'online').pipe(map(() => true)),
        new Observable((sub: Observer<boolean>) => {
          sub.next(navigator.onLine);
          sub.complete();
        }));
    }


    
}

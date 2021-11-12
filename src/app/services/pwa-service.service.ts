import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  public promptEvent: any = undefined;
  public isPwaMode: boolean = false;

  constructor() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isPwaMode = true;
    }
  }

  installPWA() {
    this.promptEvent?.prompt()
    this.promptEvent?.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        this.promptEvent = undefined;
        this.isPwaMode = true;
      } else {
        console.log('User dismissed the install prompt');
      }
    })
  }
}

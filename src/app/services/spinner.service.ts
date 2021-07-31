import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";


@Injectable()
export class SpinnerService implements HttpInterceptor {
  private loaderCount = 0;
  constructor(public loaderService: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      !req.url.includes('/upload') &&
      !req.url.includes('/applications/application') &&
      !req.url.includes('/schedule') &&
      !req.url.includes('/deleteSchedule')
    ) {
      // this.loaderCount++;
      this.loaderService.show('httpSpinner');
    }
    return next.handle(req).pipe(
      finalize(() => {
        // if (--this.loaderCount === 0) { 
          this.loaderService.hide('httpSpinner')
        // }
      })
    );
  }
}

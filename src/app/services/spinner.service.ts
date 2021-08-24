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
      !req.url.includes('/contact') &&
      !req.url.includes('/getContact') &&
      !req.url.includes('/deleteSchedule') &&
      !req.url.includes('/ward')
    ) {
      setTimeout(() => {
        this.loaderCount++;
        this.loaderService.show('httpSpinner');
      });
    }
    return next.handle(req).pipe(
      finalize(() => {
        if (--this.loaderCount === 0) { 
          setTimeout(() => {
            this.loaderService.hide('httpSpinner')
          });
        }
      })
    );
  }
}

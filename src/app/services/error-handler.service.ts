import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(    
    private snackbar: MatSnackBar,
  ) {
   }
  
  //handle lazy loading chunk error 
  handleError(error: any): void {    
    console.error(error);
    // const chunkFailedMessage = /Loading chunk [\d]+ failed/;    
    if ((error.message as string).indexOf('ChunkLoadError:') >= 0) {     
      this.snackbar.open('Error occured while loading. Please Refresh', 'Refresh', {
        duration: 100000,
        panelClass: ['bg-danger', 'text-white']
      }).onAction().subscribe(() => {
        document.location.reload();
      });
    }
  }

}

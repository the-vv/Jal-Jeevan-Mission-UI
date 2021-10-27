import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApplicationFile } from 'src/app/models/application';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input('labelName')
  public labelToShow: string = 'Attatchement';

  @Input('control')
  public control: FormControl;

  public chooserStyles = {
    backgroundColor: 'unset',
    color: 'grey',
    border: '1px solid #ced4da',
    fontWeight: 'unset',
    fontSize: '0.9em',
    borderRadius: '.25rem',
    width: '100%',
    paddingTop: '14px',
    paddingBottom: '14px',
    marginTop: '4px'
  }
  public fileProgress: number = 0;
  public fileinfo: string;
  private uploadSUbscription: Subscription;
  public uploadComplete: boolean = false;
  private fileDetails: ApplicationFile[];
  public uploading: boolean = false;

  constructor(
    public rest: RestapiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  viewFile(file: ApplicationFile) {
    if (file?.url) {
      window.open(file.url)
    }
  }

  fileRemoved() {
    if (this.uploading) {
      this.uploadSUbscription.unsubscribe();
      this.uploadComplete = false;
      this.uploading = false;
      this.fileinfo = ''; 
      this.fileProgress = 0;     
      this.snackBar.open('Uploading has been cancelled', 'Dismiss', { duration: 5000 })
    } else {
      this.rest.deleteBulkFiles(this.fileDetails.map(el => el.fid))
        .subscribe(res => {
          this.fileProgress = 0;
          this.fileDetails = [];
          this.uploadComplete = false;
          this.fileinfo = '';
          this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
        }, err => {
          this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
        })
    }
  }

  fileSelected(event: any) {
    let files = event.currentFiles as File[];
    let nameList = files.map(el => el.name).join(', ');
    this.fileinfo = `(${files.length} File(s)) ${nameList}`;
    console.log(this.fileinfo)
    let form: FormData = new FormData();
    files.forEach(f => {
      form.append(`${this.labelToShow}`, f, `${this.labelToShow}.` + f.name.split('.')[f.name.split('.').length - 1]);
    })
    this.uploading = true;
    this.uploadSUbscription = this.rest.uploadFiles(form)
      .subscribe(res => {
        switch (res.type) {
          // case HttpEventType.Sent:
          //   console.log('Request has been made!');
          //   break;
          // case HttpEventType.ResponseHeader:
          //   console.log('Response header has been received!');
          //   break;
          case HttpEventType.UploadProgress:
            this.fileProgress = Math.round(res.loaded / res.total * 100);
            // console.log(`Uploaded! ${this.fileProgress}%`);
            break;
          case HttpEventType.Response:
            this.uploading = false;
            let uploadedFiles: ApplicationFile[] = [];
            res.body.forEach((element: any) => {
              let name = element.name.split('_')[0].split('-')[1];
              uploadedFiles.push({
                name: element.name,
                fieldName: name,
                url: element.url,
                fid: element.fileId,
                size: element.size
              })
            });
            this.fileProgress = 0;
            this.fileDetails = uploadedFiles;
            this.control?.setValue(JSON.stringify(uploadedFiles));
            this.uploadSUbscription = null;
            this.uploadComplete = true;
        }
      }, err => {
        this.snackBar.open('Error uploadfing file(s), Please try again later', 'Dismiss', { duration: 5000 })
      })
  }

  fileUpload(event: any) {
    console.log(event);
  }

  onProgress(event: any) {
    this.fileProgress = event.progress;
  }

  public checkUploadStatus() {
    return this.uploading;
  }
}

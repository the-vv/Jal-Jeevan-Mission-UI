import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApplicationFile } from 'src/app/models/application';
import { RestapiService } from 'src/app/services/restapi.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnDestroy, OnChanges {

  @Input('labelName')
  public labelToShow: string = 'Attatchement';

  @Input('control')
  public control: FormControl | AbstractControl;

  @Input('keyName')
  public ControlKey: string;

  @Input('disabled')
  public isDisabled: boolean = false;

  @Output('onfileChanges')
  public fileChangeEMittor = new EventEmitter<void>()

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
  public fileDetails: ApplicationFile[];
  public uploading: boolean = false;

  constructor(
    public rest: RestapiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.setFileField();
  }

  setFileField() {
    // console.log(this.control?.value)
    // console.log(this.isDisabled)
    if (this.control.value[this.ControlKey]?.length) {
      try {
        let uploadedFiles = JSON.parse(this.control.value[this.ControlKey]);
        this.uploading = false;
        this.fileProgress = 0;
        this.fileDetails = uploadedFiles;
        this.uploadSUbscription = null;
        this.uploadComplete = true;
        let nameList = uploadedFiles.map(el => el.name).join(', ');
        this.fileinfo = `<strong><em>(${uploadedFiles.length} File(s))</em></strong> ${nameList}`;
      }
      catch {
        this.uploadComplete = false;
        this.uploading = false;
        this.fileinfo = '';
        this.fileProgress = 0;
        let formctrlValue = {};
        formctrlValue[this.ControlKey] = '';
        this.control?.patchValue(formctrlValue);
        this.fileChangeEMittor.emit();
      }
    }
  }

  viewFile(file: ApplicationFile) {
    if (file?.url) {
      window.open(file.url)
    }
  }

  fileRemoved(event: any) {
    if(this.isDisabled) {
      return;
    }
    event.stopPropagation();
    if (this.uploading) {
      this.uploadSUbscription?.unsubscribe();
      this.uploadComplete = false;
      this.uploading = false;
      this.fileinfo = '';
      this.fileProgress = 0;
      let formctrlValue = {};
      formctrlValue[this.ControlKey] = '';
      this.control?.patchValue(formctrlValue);
      this.fileChangeEMittor.emit();
      this.snackBar.open('Uploading has been cancelled', 'Dismiss', { duration: 5000, panelClass: ['bg-warning','text-dark'] })
    } else {
      this.rest.deleteBulkFiles(this.fileDetails.map(el => el.fid))
        .subscribe(res => {
          this.fileProgress = 0;
          this.fileDetails = [];
          this.uploadComplete = false;
          this.fileinfo = '';
          let formctrlValue = {};
          formctrlValue[this.ControlKey] = '';
          this.control?.patchValue(formctrlValue);
          this.fileChangeEMittor.emit();
          this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000, panelClass: 'bg-success' })
        }, err => {
          this.fileinfo = '';
          let formctrlValue = {};
          formctrlValue[this.ControlKey] = '';
          this.control?.patchValue(formctrlValue);
          this.fileChangeEMittor.emit();
          this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
        })
    }
  }

  fileSelected(event: any) {
    if(this.isDisabled) {
      return;
    }
    let files = event.currentFiles as File[];
    let nameList = files.map(el => el.name).join(', ');
    this.fileinfo = `<strong><em>(${files.length} File(s))</em></strong> ${nameList}`;
    console.log(this.fileinfo)
    let form: FormData = new FormData();
    files.forEach(async (f) => {
      form.append(`${this.labelToShow}`, f, f.name);
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
            this.uploading = false;
            this.fileProgress = 0;
            this.fileDetails = uploadedFiles;
            let formctrlValue = {};
            formctrlValue[this.ControlKey] = JSON.stringify(uploadedFiles)
            this.control?.patchValue(formctrlValue);
            this.uploadSUbscription = null;
            this.uploadComplete = true;
            this.fileChangeEMittor.emit();
        }
      }, err => {
        this.fileProgress = 0;
        this.fileDetails = [];
        this.uploadComplete = false;
        this.fileinfo = '';
        let formctrlValue = {};
        formctrlValue[this.ControlKey] = '';
        this.control?.patchValue(formctrlValue);
        this.fileChangeEMittor.emit();
        this.snackBar.open('Error uploadfing file(s), ' + err.error.status, 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
      })
  }

  public checkUploadStatus() {
    return this.uploading;
  }

  ngOnDestroy() {
    if (this.uploading) {
      this.uploadSUbscription?.unsubscribe();
      this.uploadComplete = false;
      this.uploading = false;
      this.fileinfo = '';
      this.fileProgress = 0;
      let formctrlValue = {};
      formctrlValue[this.ControlKey] = '';
      this.control?.patchValue(formctrlValue);
      this.fileChangeEMittor.emit();
      this.snackBar.open('Uploading has been cancelled', 'Dismiss', { duration: 5000, panelClass: ['bg-warning','text-dark'] })
    }
  }

  ngOnChanges() {
    this.setFileField()
  }

}

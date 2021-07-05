import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Application, ApplicationFile } from '../../models/application';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
const moment = _rollupMoment || _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-isa-positioning',
  templateUrl: './isa-positioning.component.html',
  styleUrls: ['./isa-positioning.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class IsaPositioningComponent implements OnInit, AfterViewInit {

  formdata: Application = {
    files: []
  };
  isAdmin: boolean = this.user.isAdmin;
  canUpload: boolean = false;
  applicationForm!: FormGroup;
  dsmMeetingFile: any = null;
  agreementFile: any = null;
  officeStartingPhoto: any = null;
  submitting: boolean = false;
  submittedApplcations: Application[] = [];
  editingId: string = '';
  showForm: boolean = false;
  submitted: boolean = false;

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    public data: DataService,
    private route: ActivatedRoute,
    private rest: RestapiService,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.rest.getApplications(this.data.selectedDetails)
      .subscribe(res => {
        console.log(res)
        this.submittedApplcations = res;
        if (res.length > 0) {
          this.applicSelected(res[0])
          this.showForm = false;
        }
        else {
          this.showForm = true;
        }
      }, e => {
        console.log(e.error);
        this.snackBar.open('Something went wrong, Please try again later', 'Dismiss', { duration: 5000 })
      })
  }

  ngOnInit(): void {
    this.route.url.subscribe((val) => {
      if (!this.data.selectedDetails.phase) {
        this.data.selectComponent(`Planning Phase/${val[1].path}`)
      }
      this.formdata.name = val.map(v => v.path).join('/')
      console.log(val.map(v => v.path).join('/'))
    })
    this.canUpload = !this.user.isAdmin;
    this.applicationForm = this.formBuilder.group({
      dwsmDate: [moment('')],
      dwsmNo: [''],
      agreementDate: [moment('')],
      agreementNo: [''],
      officeStartingDate: [moment('')],
      teamLeaderAddress: [''],
      teamLeaderNo: [''],
      comminityEngAddress: [''],
      communityEngNo: [''],
      communityfacilAddress: [''],
      communityFacilNo: ['']
    })
    this.applicationForm.valueChanges.subscribe(() => {
      this.submitted = false;
    })
  }
  get f() { return this.applicationForm.controls }

  onSubmit() {
    if (this.editingId.length > 0) {
      this.formdata._id = this.editingId
    }
    if (!this.agreementFile && !this.dsmMeetingFile && !this.officeStartingPhoto) {
      console.log('No attatchments, continuing');
      this.formdata.values = this.applicationForm.value;
      this.formdata.category = this.data.selectedDetails;
      this.formdata.datetime = new Date();
      console.log(this.formdata)
      console.log(new Date(this.formdata.values.dwsmDate))
      this.submitting = true;
      this.sendApplication(this.formdata, this.editingId.length > 0)
    }
    else {
      console.log(this.agreementFile)
      let form: FormData = new FormData();
      if (this.agreementFile && !this.agreementFile.fid) {
        form.append('file1', this.agreementFile, 'agreementAttatchment.' + this.agreementFile.name.split('.')[this.agreementFile.name.split('.').length - 1]);
      }
      if (this.dsmMeetingFile && !this.dsmMeetingFile.fid) {
        form.append('file2', this.dsmMeetingFile, 'dsmMeetingAttatchment.' + this.dsmMeetingFile.name.split('.')[this.dsmMeetingFile.name.split('.').length - 1]);
      }
      if (this.officeStartingPhoto && !this.officeStartingPhoto.fid) {
        form.append('file2', this.officeStartingPhoto, 'officeStartingPhoto.' + this.officeStartingPhoto.name.split('.')[this.officeStartingPhoto.name.split('.').length - 1]);
      }
      this.submitting = true;
      this.rest.uploadFiles(form)
        .subscribe((res) => {
          console.log(res)
          res.forEach((element: any) => {
            let name = element.name.split('_')[0];
            this.formdata.files?.push({
              name: element.name,
              fieldName: name,
              url: element.url,
              fid: element.fileId,
              size: element.size
            })
          });
          this.formdata.values = this.applicationForm.value;
          this.formdata.category = this.data.selectedDetails;
          this.formdata.datetime = new Date();
          this.submitting = true;
          this.sendApplication(this.formdata, this.editingId.length > 0)
          console.log(this.formdata)
        }, err => {
          console.warn(err.error.status)
          if (err.error.status == 'Empty file') {
            this.formdata.values = this.applicationForm.value;
            this.formdata.category = this.data.selectedDetails;
            this.formdata.datetime = new Date();
            this.submitting = true;
            this.sendApplication(this.formdata, this.editingId.length > 0)
            console.log(this.formdata)
          }
          else {
            this, this.submitting = false;
            this.snackBar.open('Error uploading File(s), Please try again later', 'Dismiss', { duration: 5000 })
          }
        })
    }
  }

  fileSelected(event: any, name: string) {
    this.submitted = false
    // console.log(event.target.files)
    if (name === 'agreement') {
      this.agreementFile = event.files[0]
    }
    else if (name === 'dsmMeeting') {
      this.dsmMeetingFile = event.files[0]
    }
    else if (name === 'officeStartingPhoto') {
      this.officeStartingPhoto = event.files[0]
    }
  }

  sendApplication(app: Application, update: boolean = false, silent: boolean = false) {
    if (update) {
      this.rest.editApplication(app)
        .subscribe(res => {
          console.log(res)
          this.submitting = false;
          if (!silent) {
            this.showForm = false;
            this.editingId = '';
            this.applicationForm.reset()
            this.agreementFile = null;
            this.dsmMeetingFile = null;
            this.officeStartingPhoto = null;
            this.formdata.files = []
          }
          this.submittedApplcations = this.submittedApplcations.filter(el => {
            return el._id != res._id
          });
          this.submittedApplcations.unshift(res);
          // this.applicationForm.reset()
          this, this.applicSelected(res);
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error Submitting Application, please try again later', 'Dismiss', { duration: 5000 })
        })
    }
    else {
      this.rest.submitApplication(app)
        .subscribe(res => {
          console.log(res)
          this.submitting = false;
          if (!silent) {
            this.showForm = false;
            this.editingId = '';
            this.applicationForm.reset()
            this.agreementFile = null;
            this.dsmMeetingFile = null;
            this.officeStartingPhoto = null;
            this.formdata.files = []
          }
          this.submittedApplcations.unshift(res);
          // this.applicationForm.reset()
          this, this.applicSelected(res);
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error Submitting Application, please try again later', 'Dismiss', { duration: 5000 })
        })
    }
  }

  fileRemoved(id: string) {
    this.submitted = false;
    if (id && id.length > 0) {
      console.log(this.formdata)
      this.formdata._id = this.editingId
      this.formdata.files = (this.formdata.files as ApplicationFile[]).filter(el => {
        console.log(el.fid, id)
        return el.fid != id
      })
      // console.log(this.formdata)
      this.sendApplication(this.formdata, true, true)
      this.rest.deleteFile(id)
        .subscribe((res) => {
          console.log('file deleted', res)
        }, err => console.log(err.error))
    }
  }

  applicSelected(app: Application) {
    this.showForm = true
    this.applicationForm.patchValue(app.values);
    this.editingId = app._id as string
    if ((app.files as ApplicationFile[])?.length > 0) {
      (app.files as ApplicationFile[])?.forEach(el => {
        if (el.fieldName === 'agreementAttatchment') {
          this.agreementFile = el;
          this, this.formdata.files?.push(el)
        }
        if (el.fieldName === 'dsmMeetingAttatchment') {
          this.dsmMeetingFile = el;
          this, this.formdata.files?.push(el)
        }
        if (el.fieldName === 'officeStartingPhoto') {
          this.officeStartingPhoto = el;
          this, this.formdata.files?.push(el)
        }
      })
    }
  }

  onReset() {
    this.showForm = false;
    this.editingId = '';
    this.applicationForm.reset()
    this.agreementFile = null;
    this.dsmMeetingFile = null;
    this.officeStartingPhoto = null;
    this.formdata.files = []
  }

  hasAttatchment(files: ApplicationFile[] | undefined) {
    return (files as ApplicationFile[]).length > 0
  }

  getAttatchemenstIfAny(appl: Application, fname: string) {
    let toReturn: string = 'File Not Attatched';
    appl.files?.forEach(f => {
      if (f.fieldName === fname) {
        toReturn = `
        <a href="${f.url}" download target="_blank">
          View Attatchement 
        </a>
        `
      }
    })
    return toReturn
  }

  navigate(event: any) {
    console.log(event.item)
  }

  viewFile(file: ApplicationFile) {
    if (file.url) {
      window.open(file.url)
    }
  }

}


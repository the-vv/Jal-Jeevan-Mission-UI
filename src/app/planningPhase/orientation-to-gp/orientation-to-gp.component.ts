import { Component, OnInit } from '@angular/core';
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
  selector: 'app-orientation-to-gp',
  templateUrl: './orientation-to-gp.component.html',
  styleUrls: ['./orientation-to-gp.component.scss']
})
export class OrientationToGpComponent implements OnInit {

  formdata: Application = {
    files: []
  };
  isAdmin: boolean = this.user.isAdmin;
  canUpload: boolean = false;
  applicationForm!: FormGroup;
  dsmMeetingFile: any = null;
  agreementFile: any = null;
  submitting: boolean = false;
  submittedApplcations: Application[] = [];
  editingId: string = '';
  showForm: boolean = false;

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    public data: DataService,
    private route: ActivatedRoute,
    private rest: RestapiService
  ) { }

  ngOnInit(): void {
    this.rest.getApplications(this.data.selectedDetails)
      .subscribe(res => {
        console.log(res)
        this.submittedApplcations = res;
        if(res.length > 0) {
          this.showForm = false;
        }
        else {
          this.showForm = true;
        }
      }, e => console.log(e.error))
    this.route.url.subscribe((val) => {
      this.formdata.name = val[0].path
      console.log(val[0].path)
    })
    this.canUpload = !this.user.isAdmin;
    this.applicationForm = this.formBuilder.group({
      dwsmDate: [moment('')],
      agreementDate: [moment('')],
      officeStartingDate: [moment('')],
      teamLeaderAddress: [''],
      teamLeaderNo: [''],
      comminityEngAddress: [''],
      communityEngNo: [''],
      communityfacilAddress: [''],
      communityFacilNo: ['']
    })
  }
  get f() { return this.applicationForm.controls }

  onSubmit() {
    if (this.editingId.length > 0) {
      this.formdata._id = this.editingId
    }
    if (!this.agreementFile && !this.dsmMeetingFile) {
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
        })
    }
  }

  fileSelected(event: any, name: string) {
    // console.log(event.target.files)
    if (name === 'agreement') {
      this.agreementFile = event.target.files[0]
    }
    else if (name === 'dsmMeeting') {
      this.dsmMeetingFile = event.target.files[0]
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
          }
          this.submittedApplcations = this.submittedApplcations.filter(el => {
            return el._id != res._id
          });
          this.submittedApplcations.unshift(res);
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
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
          }
          this.submittedApplcations.unshift(res);
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
        })
    }
  }

  fileRemoved(id: string) {
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
      })
    }
  }

  onReset() {
    this.showForm = false;
    this.editingId = '';
    this.applicationForm.reset()
    this.agreementFile = null;
    this.dsmMeetingFile = null;
  }

  hasAttatchment(files: ApplicationFile[] | undefined) {
    return (files as ApplicationFile[]).length > 0
  }

  getAttatchemenstIfAny(appl: Application, fname: string) {
    let toReturn: string = '';
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

}
  
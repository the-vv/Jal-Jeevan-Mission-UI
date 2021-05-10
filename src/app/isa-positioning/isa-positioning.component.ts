import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Application } from '../models/application';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../services/restapi.service';

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
export class IsaPositioningComponent implements OnInit {
  
  formdata: Application = {
    files: []
  };
  isAdmin: boolean = this.user.isAdmin;
  canUpload: boolean = false;
  applicationForm!: FormGroup;
  dsmMeetingFile: any;
  agreementFile: any;
  submitting: boolean = false;
  submittedApplcations: Application[] = [];

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
    if (!this.agreementFile && !this.dsmMeetingFile) {
      console.log('No attatchments, continuing');
      this.formdata.values = this.applicationForm.value;
      this.formdata.category = this.data.selectedDetails;
      this.formdata.datetime = new Date();
      console.log(this.formdata)
      console.log(new Date(this.formdata.values.dwsmDate))
      this.submitting = true;
      this.rest.submitApplication(this.formdata)
        .subscribe(res => {
          console.log(res)
          this.submitting = false;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
        })
    }
    else {
      let form: FormData = new FormData();
      this.agreementFile && form.append('file1', this.agreementFile, 'agreementAttatchment.' + this.agreementFile.name.split('.')[this.agreementFile.name.split('.').length - 1]);
      this.dsmMeetingFile && form.append('file2', this.dsmMeetingFile, 'dsmMeetingAttatchment.' + this.dsmMeetingFile.name.split('.')[this.dsmMeetingFile.name.split('.').length - 1]);
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
          this.rest.submitApplication(this.formdata)
            .subscribe(res => {
              console.log(res)
              this.submitting = false;
            }, e => {
              console.log(e.error.status)
              this.submitting = false;
            })
        }, err => {
          console.warn(err.error.status)
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
    // console.log(this.agreementFile, this.dsmMeetingFile)
  }

}


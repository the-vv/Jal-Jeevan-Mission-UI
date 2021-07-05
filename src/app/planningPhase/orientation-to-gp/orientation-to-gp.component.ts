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
  selector: 'app-orientation-to-gp',
  templateUrl: './orientation-to-gp.component.html',
  styleUrls: ['./orientation-to-gp.component.scss']
})
export class OrientationToGpComponent implements OnInit, AfterViewInit {

  formdata: Application = {
    files: []
  };
  isAdmin: boolean = this.user.isAdmin;
  applicationForm!: FormGroup;
  introductionFile: any = null;
  InterDepartmentFile: any = null;
  GpBoardMeetingFile: any = null;
  jontAccountFile: any = null;
  interDepartmentPhoto: any = null;
  submitting: boolean = false;
  submittedApplcations: Application[] = [];
  editingId: string = '';
  showForm: boolean = false;
  submitted = false;

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
      if(res.length > 0) {
        this.showForm = false;
        this.applicSelected(res[0])
      }
      else {
        this.showForm = true;
      }
    }, e => {
      console.log(e.error)
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
    this.applicationForm = this.formBuilder.group({
      introductionDate: [moment('')],
      introductionNo: [''],
      iecPlanNo: [''],
      iecPlanAmount: [''],
      interDepartmentDate: [moment('')],
      interDepartmentNo: [''],
      GpBoardMeetingDate: [moment('')],
      GpBoardMeetingNo: [''],
      JointAccountNo: [''],
      jointAccountDate: [''],
      jointAccountBank: [''],
      jointAccountBranch: [''],
      jointAccointIFSC: [''],
      jointAccountSecretary: [''],
      jointAccountPresident: [''],
      jointAccointAddress: ['']
    })
  }
  get f() { return this.applicationForm.controls }

  onSubmit() {
    if (this.editingId.length > 0) {
      this.formdata._id = this.editingId
    }
    if (!this.introductionFile && !this.InterDepartmentFile && !this.GpBoardMeetingFile && !this.jontAccountFile && !this.interDepartmentPhoto) {
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
      // console.log(this.agreementFile)
      let form: FormData = new FormData();
      if (this.introductionFile && !this.introductionFile.fid) {
        form.append('file1', this.introductionFile, 'introductionAttatchement.' + this.introductionFile.name.split('.')[this.introductionFile.name.split('.').length - 1]);
      }
      if (this.InterDepartmentFile && !this.InterDepartmentFile.fid) {
        form.append('file2', this.InterDepartmentFile, 'interDepartmentAttatchment.' + this.InterDepartmentFile.name.split('.')[this.InterDepartmentFile.name.split('.').length - 1]);
      }
      if (this.GpBoardMeetingFile && !this.GpBoardMeetingFile.fid) {
        form.append('file3', this.GpBoardMeetingFile, 'gpBoardMeetingAttatchment.' + this.GpBoardMeetingFile.name.split('.')[this.GpBoardMeetingFile.name.split('.').length - 1]);
      }
      if (this.jontAccountFile && !this.jontAccountFile.fid) {
        form.append('file4', this.jontAccountFile, 'jointAccountAttatchment.' + this.jontAccountFile.name.split('.')[this.jontAccountFile.name.split('.').length - 1]);
      }
      if (this.interDepartmentPhoto && !this.interDepartmentPhoto.fid) {
        form.append('file4', this.interDepartmentPhoto, 'interDepartmentPhoto.' + this.interDepartmentPhoto.name.split('.')[this.interDepartmentPhoto.name.split('.').length - 1]);
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
            this.submitting = false;
            this.snackBar.open('Error uploading file, Please try again later', 'Dismiss', { duration: 5000 })
          }
        })
    }
  }

  fileSelected(event: any, name: string) {
    this.submitted = false;
    console.log(event.files)
    if (name === 'introductionAttatchement') {
      this.introductionFile = event.files[0]
    }
    else if (name === 'interDepartmentAttatchment') {
      this.InterDepartmentFile = event.files[0]
    }
    else if (name === 'gpBoardMeetingAttatchment') {
      this.GpBoardMeetingFile = event.files[0]
    }
    else if (name === 'jointAccountAttatchment') {
      this.jontAccountFile = event.files[0]
    }
    else if (name === 'interDepartmentPhoto') {
      this.interDepartmentPhoto = event.files[0]
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
            this.introductionFile = null;
            this.GpBoardMeetingFile = null;
            this.InterDepartmentFile = null;
            this.jontAccountFile = null;
            this.interDepartmentPhoto = null;
            this.formdata.files = []
          }
          this.submittedApplcations = this.submittedApplcations.filter(el => {
            return el._id != res._id
          });
          this.submittedApplcations.unshift(res);
          // this.applicationForm.reset();
          this.applicSelected(res)
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submitting application, Please try again later', 'Dismiss', { duration: 5000 })
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
            this.introductionFile = null;
            this.GpBoardMeetingFile = null;
            this.InterDepartmentFile = null;
            this.jontAccountFile = null;
            this.interDepartmentPhoto = null;
            this.formdata.files = []
          }
          this.submittedApplcations.unshift(res);
          // this.applicationForm.reset();
          this.applicSelected(res)
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submitting application, Please try again later', 'Dismiss', { duration: 5000 })
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
      console.log(this.formdata)
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
        if (el.fieldName === 'introductionAttatchement') {
          this.introductionFile = el;
          this.formdata.files?.push(el)
        }
        if (el.fieldName === 'interDepartmentAttatchment') {
          this.InterDepartmentFile = el;
          this, this.formdata.files?.push(el)
        }
        if (el.fieldName === 'gpBoardMeetingAttatchment') {
          this.GpBoardMeetingFile = el;
          this, this.formdata.files?.push(el)
        }
        if (el.fieldName === 'jointAccountAttatchment') {
          this.jontAccountFile = el;
          this.formdata.files?.push(el)
        }
        if (el.fieldName === 'interDepartmentPhoto') {
          this.interDepartmentPhoto = el;
          this.formdata.files?.push(el)
        }
      })
    }
  }

  onReset() {
    this.showForm = false;
    this.editingId = '';
    this.applicationForm.reset()
    this.introductionFile = null;
    this.GpBoardMeetingFile = null;
    this.InterDepartmentFile = null;
    this.jontAccountFile = null;
    this.interDepartmentPhoto = null;
    this.formdata.files = []
  }

  hasAttatchment(files: ApplicationFile[] | undefined) {
    return (files as ApplicationFile[]).length > 0
  }

  getAttatchemenstIfAny(appl: Application, fname: string, dname: string) {
    let toReturn: string = `${dname} not Attatched`;
    appl.files?.forEach(f => {
      if (f.fieldName === fname) {
        toReturn = `
        <a href="${f.url}" download target="_blank" class="">
          View ${dname} 
        </a>
        `
      }
    })
    return toReturn
  }
  
  viewFile(file: ApplicationFile) {
    if (file.url) {
      window.open(file.url)
    }
  }

}
  
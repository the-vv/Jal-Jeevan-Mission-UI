import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Application, ApplicationFile } from '../../models/application';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-community-orientation',
  templateUrl: './community-orientation.component.html',
  styleUrls: ['./community-orientation.component.scss']
})
export class CommunityOrientationComponent implements OnInit, AfterViewInit {

  formdata: Application = {
    files: []
  };

  filesToUpload: any[] = [];
  iecActivities: FormArray = new FormArray([]);
  isAdmin: boolean = this.user.isAdmin;
  applicationForm!: FormGroup;
  submitting: boolean = false;
  submittedApplcations: Application[] = [];
  editingId: string = '';
  showForm: boolean = false;
  submitted: boolean = false;
  targetDate: Date;
  settingDateProgress: boolean = false;

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    public data: DataService,
    private route: ActivatedRoute,
    private rest: RestapiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.rest.getApplications(this.data.selectedDetails)
      .subscribe(res => {
        console.log(res)
        this.submittedApplcations = res;
        if (res.length > 0) {
          this.editingId = res[0]._id;
          this.targetDate = res[0].targetDate;
          this.showForm = false;
          if(res[0].values) {
            this.applicSelected(res[0])
          }
          else {
            this.showForm = true;
            for (let i = 0; i < this.data.getWardCount(); i++) {
              this.addWard()
            }
          }
        }
        else {
          this.showForm = true;
          for (let i = 0; i < this.data.getWardCount(); i++) {
            this.addWard()
          }
        }
      }, e => {
        console.log(e.error)
        this.snackBar.open('Something went wrong, Please try again later', 'Dismiss', { duration: 5000 })
      })
    this.applicationForm.statusChanges.subscribe(() => {
      this.submitted = false;
    })
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      wards: this.formBuilder.array([])
    })
    // console.log((this.applicationForm.get('wards') as FormArray).controls)    
    this.route.url.subscribe((val) => {
      if (!this.data.selectedDetails.phase) {
        this.data.selectComponent(`Planning Phase/${val[1].path}`)
      }
      this.formdata.name = val.map(v => v.path).join('/')
      console.log(val.map(v => v.path).join('/'))
    })
  }
  get f() { return this.applicationForm.controls }

  wards() {
    return this.applicationForm.get('wards') as FormArray
  }

  getMeeting(windex: number, mindex: number) {
    let w = (this.wards().at(windex).get('meetings') as FormArray).at(mindex)
    // console.log(`w`, w)
    return w
  }

  newWard() {
    return this.formBuilder.group({
      meetings: this.formBuilder.array([this.newMeeting()])
    })
  }

  addWard() {
    console.log('Adding Ward')
    this.wards().push(this.newWard())
  }

  wardMeetings(index: number) {
    return this.wards().at(index).get('meetings') as FormArray
  }

  addMeeting(index: number) {
    this.wardMeetings(index).push(this.newMeeting())
  }

  newMeeting() {
    return this.formBuilder.group({
      date: [''],
      participationType: '',
      attendanceM: '',
      attendanceF: '',
      attendanceT: '',
      reportIndex: '',
      minutesIndex: ''
    })
  }

  getKeys(o: Object) {
    return Object.keys(o)
  }

  onSubmit() {
    if (this.editingId.length > 0) {
      this.formdata._id = this.editingId
    }
    if (!this.filesToUpload.length) {
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
      this.filesToUpload.forEach(f => {
        if (!f.file.fid) {
          form.append(`ClusterMeetingAtatchement-${f.fname}`, f.file, `ClusterMeetingAtatchement-${f.fname}.` + f.file.name.split('.')[f.file.name.split('.').length - 1]);
        }
      })
      this.submitting = true;
      this.rest.uploadFiles(form)
        .subscribe((res) => {
          console.log(res)
          res.forEach((element: any) => {
            let name = element.name.split('_')[0].split('-')[1];
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
          console.warn(err.error)
          if (err.error.status == 'Empty file') {
            this.formdata.values = this.applicationForm.value;
            this.formdata.category = this.data.selectedDetails;
            this.formdata.datetime = new Date();
            this.submitting = true;
            this.sendApplication(this.formdata, this.editingId.length > 0)
            console.log(this.formdata)
          }
          else {
            this.snackBar.open('Error uploading file(s), Please try again later', 'Dismiss', { duration: 5000 })
          }
        })
    }
  }

  fileSelected(event: any, windex: number, mindex: number, ftype: number) {
    // console.log(event.files)
    this.submitted = false;
    this.filesToUpload.push({
      fname: `fC${windex}M${mindex}T${ftype}`,
      file: event.files[0]
    })
    let tform = this.getMeeting(windex, mindex)
    // tform.reportIndex = `fC${windex}M${mindex}T${ftype}`;
    if(ftype === 0) {
      tform.patchValue({ reportIndex: `fC${windex}M${mindex}T${ftype}` })
    } else {
      tform.patchValue({ minutesIndex: `fC${windex}M${mindex}T${ftype}` })
    }
    console.log(tform)
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
            this.formdata.files = []
          }
          console.log(this.submittedApplcations)
          this.submittedApplcations = this.submittedApplcations.filter(el => {
            return el._id != res._id
          });
          this.submittedApplcations.unshift(res);
          this.applicSelected(res)
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          // this.submitted = false;
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
            this.formdata.files = []
          }
          this.submittedApplcations.unshift(res);
          this.applicSelected(res)
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submitting application, Please try again later', 'Dismiss', { duration: 5000 })
        })
    }
  }

  fileRemoved(windex: number, mindex: number, fid: string, ftype: number) {
    this.submitted = false;
    console.log(this.formdata)
    this.filesToUpload = this.filesToUpload.filter(el => {
      // console.log(el, index)
      return el.fname != `fC${windex}M${mindex}T${ftype}`
    })
    if(ftype === 0) {
      this.getMeeting(windex, mindex).patchValue({ reportIndex: '' })
    } else {
      this.getMeeting(windex, mindex).patchValue({ minutesIndex: '' })
    }
    if (fid?.length > 0) {
      this.formdata._id = this.editingId
      this.formdata.values = this.applicationForm.value
      this.formdata.files = (this.formdata.files as ApplicationFile[]).filter(el => {
        // console.log(el.fieldName, index)
        return el.fieldName != `fC${windex}M${mindex}T${ftype}`
      })
      fid?.length && this.sendApplication(this.formdata, true, true)
      if (fid) {
        this.rest.deleteFile(fid)
          .subscribe((res) => {
            console.log('file deleted', res)
          }, err => console.log(err.error))
      }
    }
  }

  getFileFromIndex(windex: number, mindex: number, ftype: number) {
    // console.log(this.filesToUpload)
    return this.filesToUpload.filter(el => {
      return el.fname == `fC${windex}M${mindex}T${ftype}`
    })[0]
  }

  applicSelected(app: Application) {
    this.targetDate = app.targetDate;
    this.wards().clear();
    this.editingId = app._id
    for (let i = 0; i < app.values.wards.length; i++) {
      this.addWard()
      for (let j = 1; j < app.values.wards[i].meetings.length; j++) {
        this.addMeeting(i)
      }
    }
    this.applicationForm.patchValue(app.values);
    console.log(this.applicationForm)
    console.log(app.values)
    this.editingId = app._id as string
    if ((app.files as ApplicationFile[])?.length > 0) {
      this.filesToUpload = [];
      (app.files as ApplicationFile[]).forEach(f => {
        this.filesToUpload.push({
          fname: f.fieldName,
          file: f
        })
      })
      this.formdata.files = app.files
    }
  }

  onReset() {
    this.showForm = false;
    this.editingId = '';
    this.applicationForm.reset();
    this.filesToUpload = []
    this.formdata.files = []
    this.iecActivities.clear();
    // this.addMeeting()
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

  setTarget() {
    if (this.isAdmin) {
      let datedForm: Application = {};
      if (!this.editingId.length) {
        if(this.targetDate) {
          datedForm.targetDate = new Date(this.targetDate);
        }
        else {
          datedForm.targetDate = this.targetDate;
        }
        this.settingDateProgress = true;
        datedForm.category = this.data.selectedDetails;
        this.rest.submitApplication(datedForm)
          .subscribe(res => {
            this.settingDateProgress = false;
            console.log(res);
            this.snackBar.open('Target date has Saved Successfully', 'Dismiss', { duration: 5000 })
          }, e => {
            this.settingDateProgress = false;
            console.log(e.error.status)
            this.snackBar.open('Error setting target date, Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      else {
        if(this.targetDate) {
          datedForm.targetDate = new Date(this.targetDate);
        }
        else {
          datedForm.targetDate = this.targetDate;
        }
        datedForm._id = this.editingId;
        datedForm.category = this.data.selectedDetails;
        this.settingDateProgress = true;
        this.rest.editApplication(datedForm)
          .subscribe(res => {
            this.settingDateProgress = false;
            console.log(res);
            this.snackBar.open('Target date has Saved Successfully', 'Dismiss', { duration: 5000 })
          }, e => {
            this.settingDateProgress = false;
            console.log(e.error.status)
            this.snackBar.open('Error setting target date, Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      console.log(datedForm);

    }
  }
}

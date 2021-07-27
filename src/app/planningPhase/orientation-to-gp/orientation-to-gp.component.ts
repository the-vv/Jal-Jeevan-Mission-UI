import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Application, ApplicationFile, TargetDate } from '../../models/application';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import _ from 'lodash';

@Component({
  selector: 'app-orientation-to-gp',
  templateUrl: './orientation-to-gp.component.html',
  styleUrls: ['./orientation-to-gp.component.scss']
})
export class OrientationToGpComponent implements OnInit, AfterViewInit {

  formdata: Application = {
    files: []
  };
  filesToUpload: any[] = [];
  isAdmin: boolean = this.user.isAdmin;
  applicationForm!: FormGroup;
  submitting: boolean = false;
  submittedApplcations: Application[] = [];
  editingId: string = '';
  showForm: boolean = false;
  submitted = false;
  targetDate: TargetDate;
  settingDateProgress: boolean = false;

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    public data: DataService,
    private route: ActivatedRoute,
    private rest: RestapiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.rest.getApplications(this.data.selectedDetails)
      .subscribe(res => {
        this.submittedApplcations = res;
        if (res.length > 0) {
          this.editingId = res[0]._id;
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

  newInterDepartment(): FormGroup {
    return this.formBuilder.group({
      interDepartmentDate: [''],
      interDepartmentPlace: [''],
      interDepartmentMinutesIndex: '',
      interDepartmentPhotoIndex: ''
    })
  }

  addInterDepartment() {
    (this.applicationForm.get('interDepartmentMeeting') as FormArray)
      .push(this.newInterDepartment());
  }

  removeInterDepartment(index: number) {
    if (this.applicationForm.get('interDepartmentMeeting')['controls'][index].value.interDepartmentMinutesIndex?.length > 0) {
      this.fileRemoved('interDepartmentAttatchment', this.getFileFromName('interDepartmentAttatchment').file.fid, index);
    }
    if (this.applicationForm.get('interDepartmentMeeting')['controls'][index].value.interDepartmentPhotoIndex?.length > 0) {
      this.fileRemoved('interDepartmentPhoto', this.getFileFromName('interDepartmentPhoto').file.fid, index);
    }
    (this.applicationForm.get('interDepartmentMeeting') as FormArray).removeAt(index);
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
      introductionDate: [''],
      introductionNo: [''],
      introductionMinutesIndex: '',
      iecPlanNo: [''],
      iecPlanAmount: [''],
      interDepartmentMeeting: this.formBuilder.array([
        this.newInterDepartment()
      ]),
      GpBoardMeetingDate: [''],
      GpBoardMeetingNo: [''],
      GpBoardMeetingResolutionIndex: '',
      JointAccountNo: [''],
      jointAccountDate: [''],
      jointAccountBank: [''],
      jointAccountBranch: [''],
      jointAccointIFSC: [''],
      jointAccountPassbookIndex: '',
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
          form.append(`Attatchement-${f.fname}`, f.file, `Attatchement-${f.fname}.` + f.file.name.split('.')[f.file.name.split('.').length - 1]);
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
            this.snackBar.open('Error uploading file(s), Please try again later', 'Dismiss', { duration: 5000 })
          }
        })
    }
  }

  fileSelected(event: any, name: string, index: number = -1) {
    this.submitted = false;
    // console.log(event.files)
    this.filesToUpload.push({
      fname: `${name}`,
      file: event.files[0]
    });
    if (name === 'introductionAttatchement') {
      // this.introductionFile = event.files[0];
      this.applicationForm.patchValue({ introductionMinutesIndex: `${name}` })
    }
    else if (name === 'interDepartmentAttatchment') {
      // this.InterDepartmentFile = event.files[0]
      (this.applicationForm.get('interDepartmentMeeting') as FormArray).at(index).patchValue({ interDepartmentMinutesIndex: `${name}` })
    }
    else if (name === 'interDepartmentPhoto') {
      // this.interDepartmentPhoto = event.files[0]
      (this.applicationForm.get('interDepartmentMeeting') as FormArray).at(index).patchValue({ interDepartmentPhotoIndex: `${name}` })
    }
    else if (name === 'gpBoardMeetingAttatchment') {
      // this.GpBoardMeetingFile = event.files[0]
      this.applicationForm.patchValue({ GpBoardMeetingResolutionIndex: `${name}` })
    }
    else if (name === 'jointAccountAttatchment') {
      // this.jontAccountFile = event.files[0]
      this.applicationForm.patchValue({ jointAccountPassbookIndex: `${name}` })
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

  fileRemoved(name: string, fid: string, index: number = -1) {
    this.submitted = false;
    this.filesToUpload = this.filesToUpload.filter(el => {
      console.log(el, name)
      return el.fname != `${name}`
    });
    // this.applicationForm.get('contribution')['controls'][index].value.bankIndex = '';
    if (name === 'introductionAttatchement') {
      // this.introductionFile = event.files[0];
      this.applicationForm.patchValue({ introductionMinutesIndex: `` })
    }
    else if (name === 'interDepartmentAttatchment') {
      // this.InterDepartmentFile = event.files[0]
      (this.applicationForm.get('interDepartmentMeeting') as FormArray).at(index).patchValue({ interDepartmentMinutesIndex: `` })
    }
    else if (name === 'interDepartmentPhoto') {
      // this.interDepartmentPhoto = event.files[0]
      (this.applicationForm.get('interDepartmentMeeting') as FormArray).at(index).patchValue({ interDepartmentPhotoIndex: `` })
    }
    else if (name === 'gpBoardMeetingAttatchment') {
      // this.GpBoardMeetingFile = event.files[0]
      this.applicationForm.patchValue({ GpBoardMeetingResolutionIndex: `` })
    }
    else if (name === 'jointAccountAttatchment') {
      // this.jontAccountFile = event.files[0]
      this.applicationForm.patchValue({ jointAccountPassbookIndex: `` })
    }
    if (fid?.length) {
      console.log(this.formdata)
      this.formdata._id = this.editingId
      this.formdata.values = this.applicationForm.value
      this.formdata.files = (this.formdata.files as ApplicationFile[]).filter(el => {
        return el.fieldName != `${name}`
      })
      console.log(this.formdata)
      fid?.length > 0 && this.sendApplication(this.formdata, true, true)
      if (fid) {
        this.rest.deleteFile(fid)
          .subscribe((res) => {
            console.log('file deleted', res)
          }, err => console.log(err.error))
      }
    }
  }

  applicSelected(app: Application) {
    this.targetDate = app.targets;
    if (!app.values) {
      return;
    }
    this.onReset();
    this.showForm = true;
    for (let i = 0; i < app.values.interDepartmentMeeting.length; i++) {
      this.addInterDepartment()
    }
    this.applicationForm.patchValue(app.values);
    this.editingId = app._id as string
    if ((app.files as ApplicationFile[])?.length > 0) {
      (app.files as ApplicationFile[])?.forEach(f => {
        this.filesToUpload.push({
          fname: f.fieldName,
          file: f
        })
      })
      this.formdata.files = app.files
    }
  }

  getFileFromName(name: string) {
    return this.filesToUpload.filter(el => {
      return el.fname == `${name}`
    })[0]
  }


  onReset() {
    this.showForm = false;
    this.editingId = '';
    this.applicationForm.reset()
    this.filesToUpload = [];
    this.formdata.files = [];
    (this.applicationForm.get('interDepartmentMeeting') as FormArray).clear();
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

  setTarget(sectionName: string, targetDate: string) {
    if (this.isAdmin) {
      let datedForm: Application = {
        targets: this.targetDate
      };
      datedForm.targets.dates[sectionName] = targetDate;
      datedForm.targets.applicationName = this.data.getLongName(this.formdata.name);
      datedForm.targets.path = this.formdata.name;
      if (!this.editingId.length) {
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
        datedForm._id = this.editingId;
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
    }
  }
}

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
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-beneficiary-contribution',
  templateUrl: './beneficiary-contribution.component.html',
  styleUrls: ['./beneficiary-contribution.component.scss']
})
export class BeneficiaryContributionComponent implements OnInit {

  formdata: Application = {
    files: []
  };

  filesToUpload: any[] = [];
  iecActivities: FormArray = new FormArray([]);
  isAdmin: boolean = this.user.isAdmin;
  applicationForm!: FormGroup;
  introductionFile: any = null;
  InterDepartmentFile: any = null;
  GpBoardMeetingFile: any = null;
  jontAccountFile: any = null;
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
    private readonly changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit() {
    this.rest.getApplications(this.data.selectedDetails)
      .subscribe(res => {
        console.log(res)
        this.submittedApplcations = res;
        if (res.length > 0) {
          this.showForm = false;
          this.applicSelected(res[0]);
        }
      }, e => {
        console.log(e.error)
        this.snackBar.open('Something went wrong, Please try again later', 'Dismiss', { duration: 5000 })
      })
    this.applicationForm.valueChanges.subscribe(() => {
      this.submitted = false;
    })
  }

  addContribution() {
    this.iecActivities = this.applicationForm.get('contribution') as FormArray;
    const group = this.newContribution();
    this.iecActivities.push(group);
  }

  removeContribution(index: number) {
    // if (this.applicationForm.get('contribution')['controls'][index].value.reportIndex?.length > 0) {
    //   this.fileRemoved(index, this.getFileFromIndex(index).file.fid);
    //   console.log(this.applicationForm.get('contribution')['controls'][index].value.reportIndex)
    // }
    this.iecActivities = this.applicationForm.get('contribution') as FormArray;
    this.iecActivities.removeAt(index)
  }

  newContribution() {
    return this.formBuilder.group({
      totalBeneficiary: '',
      fullyContributionRemitted: '',
      partiallyContributionRemitted: '',
      totalAmount: ''
    })
  }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      contribution: this.formBuilder.array([
        this.newContribution()
      ])
    })
    this.route.url.subscribe((val) => {
      this.formdata.name = val[0].path
      console.log(val[0].path)
    })
    for (let index = 1; index < this.data.getWardCount(); index++) {
      this.addContribution();
    }
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
      this.submitting = true;
      this.sendApplication(this.formdata, this.editingId.length > 0)
    }
    else {
      // console.log(this.agreementFile)=
      let form: FormData = new FormData();
      this.filesToUpload.forEach(f => {
        if (!f.file.fid) {
          form.append(`meetingReport-${f.fname}`, f.file, `meetingReport-${f.fname}.` + f.file.name.split('.')[f.file.name.split('.').length - 1]);
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
            this, this.submitting = false;
            this.snackBar.open('Error uploadfing file, Please try again later', 'Dismiss', { duration: 5000 })
          }
        })
    }
  }

  fileSelected(event: any, index: number) {
    // console.log(event.files)
    this.filesToUpload.push({
      fname: `f${index}`,
      file: event.files[0]
    });
    // let tform = this.applicationForm.get('contribution')?.value[index]
    // tform.reportIndex = `f${index}`;
    // console.log(tform)
    (this.applicationForm.get('contribution') as FormArray).at(index).patchValue({ reportIndex: `f${index}` })
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
            this.formdata.files = [];
          }
          console.log(this.submittedApplcations)
          this.submittedApplcations = this.submittedApplcations.filter(el => {
            return el._id != res._id
          });
          this.submittedApplcations.unshift(res);
          // this.applicationForm.reset()
          this.applicSelected(res)
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submiting application, Please try again later', 'Dismiss', { duration: 5000 })
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
            this.formdata.files = [];
          }
          this.submittedApplcations.unshift(res);
          // this.applicationForm.reset()
          this.applicSelected(res)
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submiting application, Please try again later', 'Dismiss', { duration: 5000 })
        })
    }
  }

  fileRemoved(index: number, fid: string) {
    this.submitted = false;
    this.filesToUpload = this.filesToUpload.filter(el => {
      console.log(el, index)
      return el.fname != `f${index}`
    });
    // this.applicationForm.get('contribution')['controls'][index].value.reportIndex = '';
    (this.applicationForm.get('contribution') as FormArray).at(index).patchValue({ reportIndex: '' })
    if (fid?.length) {
      console.log(this.formdata)
      this.formdata._id = this.editingId
      this.formdata.values = this.applicationForm.value
      this.formdata.files = (this.formdata.files as ApplicationFile[]).filter(el => {
        console.log(el.fieldName, index)
        return el.fieldName != `f${index}`
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

  getFileFromIndex(index: number) {
    // console.log(this.filesToUpload)
    return this.filesToUpload.filter(el => {
      return el.fname == `f${index}`
    })[0]
  }

  applicSelected(app: Application) {
    this.showForm = true
    this.iecActivities = this.applicationForm.get('contribution') as FormArray
    this.iecActivities.clear();
    this.editingId = app._id
    for (let i = 0; i < app.values.contribution.length; i++) {
      this.addContribution()
    }
    this.applicationForm.patchValue(app.values);
    // console.log(this.applicationForm)
    console.log(app.values)
    this.editingId = app._id as string
    if ((app.files as ApplicationFile[])?.length > 0) {
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
    this.iecActivities = this.applicationForm.get('contribution') as FormArray
    this.iecActivities.clear();
    this.addContribution()
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
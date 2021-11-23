import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Application, ApplicationFile } from '../../models/application';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gp-action-plan',
  templateUrl: './gp-action-plan.component.html',
  styleUrls: ['./gp-action-plan.component.scss']
})
export class GpActionPlanComponent implements OnInit {

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
  targetDate: Date;
  settingDateProgress: boolean = false;
  totalTotalHHS: number = 0;
  totalWaterSupplyCovered: number = 0;
  totalNotConvered: number = 0;
  totalJjmBeneficiary: number = 0;
  totalDistributed: number = 0;
  totalRecieved: number = 0;

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
          this.targetDate = res[0].targetDate;
          this.editingId = res[0]._id;
          if (res[0].values) {
            this.applicSelected(res[0]);
          }
          else {
            for (let i = 1; i < this.data.getWardCount(); i++) {
              this.addBaselineSurwey()
            }
            for (let i = 1; i < this.data.getWardCount(); i++) {
              this.addApplicationFormWard()
            }
          }
        } else {
          for (let i = 1; i < this.data.getWardCount(); i++) {
            this.addBaselineSurwey()
          }
          for (let i = 1; i < this.data.getWardCount(); i++) {
            this.addApplicationFormWard()
          }
        }
      }, e => {
        console.log(e.error)
        this.snackBar.open('Something went wrong, Please try again later', 'Dismiss', { duration: 5000 });
        for (let i = 1; i < this.data.getWardCount(); i++) {
          this.addBaselineSurwey()
        }
        for (let i = 1; i < this.data.getWardCount(); i++) {
          this.addApplicationFormWard()
        }
      })
    this.applicationForm.valueChanges.subscribe(() => {
      this.submitted = false;
      // console.log(this.filesToUpload, this.applicationForm.value);
      this.calculateTotals();
    })

  }

  calculateTotals() {
    this.totalTotalHHS = 0;
    this.totalWaterSupplyCovered = 0;
    this.totalNotConvered = 0;
    this.totalJjmBeneficiary = 0;
    this.totalDistributed = 0;
    this.totalRecieved = 0;
    // console.log(this.applicationForm.value.baselineSurwey);
    this.applicationForm.value.baselineSurwey.forEach(el => {
      this.totalTotalHHS += Number(el.totalHHS);
      this.totalWaterSupplyCovered += Number(el.waterSupplyCovered);
      this.totalNotConvered += Number(el.notConvered);
      this.totalJjmBeneficiary += Number(el.jjmBeneficiary);
    });
    this.applicationForm.value.applicationFormsWards.forEach(el => {
      this.totalDistributed += Number(el.distributed);
      this.totalRecieved += Number(el.recieved);
    });
  }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      baselineSurwey: this.formBuilder.array([
        this.formBuilder.group({
          totalHHS: '',
          waterSupplyCovered: '',
          notConvered: '',
          jjmBeneficiary: ''
        })
      ]),
      existingWssName: this.formBuilder.array([
        this.formBuilder.group({
          nameofWss: '',
          ward: '',
          totalHHS: '',
          tankCapacity: '',
          typeOfSource: '',
          anyIssues: ''
        })
      ]),
      waterQuality: this.formBuilder.array([
        this.formBuilder.group({
          nameofWss: '',
          ward: '',
          totalHHS: '',
          typeOfSource: '',
          anyIssues: ''
        })
      ]),
      uncoveredArea: this.formBuilder.array([
        this.formBuilder.group({
          area: '',
          ward: '',
          totalHHS: '',
          technologyOption: '',
        })
      ]),
      identificationNewSource: this.formBuilder.array([
        this.formBuilder.group({
          area: '',
          ward: '',
        })
      ]),
      applicationFormsWards: this.formBuilder.array([
        this.formBuilder.group({
          distributed: '',
          recieved: '',
        })
      ]),
      pra: this.formBuilder.array([
        this.formBuilder.group({
          praDate: [''],
          praPlace: '',
          reportIndex: '',
          photoIndex: ''
        })
      ]),
    })
    this.route.url.subscribe((val) => {
      if (!this.data.selectedDetails.phase) {
        this.data.selectComponent(`Planning Phase/${val[1].path}`)
      }
      this.formdata.name = `other-activities/${val.map(v => v.path).join('/')}`
      console.log(val.map(v => v.path).join('/'))
    })
  }
  get f() { return this.applicationForm.controls }

  addPRA() {
    (this.applicationForm.get('pra') as FormArray)
      .push(
        this.formBuilder.group({
          praDate: [''],
          praPlace: '',
          reportIndex: '',
          photoIndex: '',
        })
      )
  }

  removePRA(rindex: number) {
    if ((this.applicationForm.get('pra') as FormArray).at(rindex).value.reportIndex?.length > 0) {
      let fid = this.getFileFromIndex(0, rindex)?.file?.fid;
      if (fid) {
        this.rest.deleteFile(fid)
          .subscribe((res) => {
            console.log('file deleted', res)
          }, err => console.log(err.error))
      }
      this.filesToUpload = this.filesToUpload.filter(el => {
        return el.fname != `f0${rindex}`
      })
    }
    if ((this.applicationForm.get('pra') as FormArray).at(rindex).value.photoIndex?.length > 0) {
      let fid = this.getFileFromIndex(1, rindex)?.file?.fid;
      if(fid) {
        this.rest.deleteFile(fid)
        .subscribe((res) => {
            console.log('file deleted', res)
          }, err => console.log(err.error))
      }
      this.filesToUpload = this.filesToUpload.filter(el => {
        return el.fname != `f1${rindex}`
      })
    }
    (this.applicationForm.get('pra') as FormArray).removeAt(rindex);
  }

  addBaselineSurwey() {
    let blsArray = this.applicationForm.get('baselineSurwey') as FormArray;
    blsArray.push(
      this.formBuilder.group({
        totalHHS: '',
        waterSupplyCovered: '',
        notConvered: '',
        jjmBeneficiary: ''
      }))
  }

  removeBaselineSurwey(index: number) {
    (this.applicationForm.get('baselineSurwey') as FormArray).removeAt(index)
  }

  addExistingWssName() {
    let existingwssn = this.applicationForm.get('existingWssName') as FormArray;
    existingwssn.push(
      this.formBuilder.group({
        nameofWss: '',
        ward: '',
        totalHHS: '',
        tankCapacity: '',
        typeOfSource: '',
        anyIssues: ''
      }))
  }

  removeExistingWssName(index: number) {
    (this.applicationForm.get('existingWssName') as FormArray).removeAt(index)
  }

  addWaterQI() {
    let wqi = this.applicationForm.get('waterQuality') as FormArray;
    wqi.push(
      this.formBuilder.group({
        nameofWss: '',
        ward: '',
        totalHHS: '',
        typeOfSource: '',
        anyIssues: ''
      })
    )
  }

  removeWaterQi(index: number) {
    (this.applicationForm.get('waterQuality') as FormArray).removeAt(index)
  }

  addidentificationNewSource() {
    let ins = this.applicationForm.get('identificationNewSource') as FormArray;
    ins.push(
      this.formBuilder.group({
        area: '',
        ward: '',
      })
    )
  }

  removeidentificationNewSource(index: number) {
    (this.applicationForm.get('identificationNewSource') as FormArray).removeAt(index)
  }

  addUncovereArea() {
    let uca = this.applicationForm.get('uncoveredArea') as FormArray;
    uca.push(
      this.formBuilder.group({
        area: '',
        ward: '',
        totalHHS: '',
        technologyOption: '',
      })
    )
  }

  removeUncovereArea(index: number) {
    (this.applicationForm.get('uncoveredArea') as FormArray).removeAt(index)
  }

  addApplicationFormWard() {
    let afw = this.applicationForm.get('applicationFormsWards') as FormArray;
    afw.push(
      this.formBuilder.group({
        distributed: '',
        recieved: '',
      })
    )
  }

  removeApplicationFormWard(index: number) {
    (this.applicationForm.get('applicationFormsWards') as FormArray).removeAt(index)
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
      this.submitting = true;
      this.sendApplication(this.formdata, this.editingId.length > 0)
    }
    else {
      // console.log(this.agreementFile)=
      let form: FormData = new FormData();
      this.filesToUpload.forEach(f => {
        if (!f.file.fid) {
          form.append(`PRAFile-${f.fname}`, f.file, `PRAFile-${f.fname}.` + f.file.name.split('.')[f.file.name.split('.').length - 1]);
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
            this.snackBar.open('Error uploading file, Please try again later', 'Dismiss', { duration: 5000 })
          }
        })
    }
  }

  fileSelected(event: any, index: number, rindex: number) {
    // console.log(event.files)
    this.filesToUpload.push({
      fname: `f${index}${rindex}`,
      file: event.files[0]
    })
    if (index === 0) {
      (this.applicationForm.get('pra') as FormArray).at(rindex).patchValue({
        reportIndex: `f${index}${rindex}`
      })
    }
    else if (index === 1) {
      (this.applicationForm.get('pra') as FormArray).at(rindex).patchValue({
        photoIndex: `f${index}${rindex}`
      })
    }
    console.log(this.applicationForm.value)
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
          this.snackBar.open('Error submiting applucation, Please try again later', 'Dismiss', { duration: 5000 })
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

  fileRemoved(index: number, fid: string, rindex: number) {
    this.submitted = false;
    this.filesToUpload = this.filesToUpload.filter(el => {
      console.log(el, index)
      return el.fname != `f${index}${rindex}`
    })
    if (index === 0) {
      (this.applicationForm.get('pra') as FormArray).at(rindex).patchValue({
        reportIndex: ''
      })
    }
    else if (index === 1) {
      (this.applicationForm.get('pra') as FormArray).at(rindex).patchValue({
        photoIndex: ''
      })
    }
    if (fid?.length) {
      console.log(this.formdata)
      this.formdata._id = this.editingId
      this.formdata.values = this.applicationForm.value
      this.formdata.files = (this.formdata.files as ApplicationFile[]).filter(el => {
        // console.log(el.fieldName, index)
        return el.fieldName != `f${index}${rindex}`
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

  getFileFromIndex(index: number, rid: number) {
    // console.log(this.filesToUpload)
    return this.filesToUpload.filter(el => {
      return el.fname == `f${index}${rid}`
    })[0]
  }

  applicSelected(app: Application) {
    this.targetDate = app.targetDate;
    this.showForm = true
    this.onReset()
    // console.log(this.applicationForm);    
    this.editingId = app._id
    for (let i = 1; i < app.values.baselineSurwey.length; i++) {
      this.addBaselineSurwey()
    }
    for (let i = 1; i < app.values.existingWssName.length; i++) {
      this.addExistingWssName()
    }
    for (let i = 1; i < app.values.waterQuality.length; i++) {
      this.addWaterQI()
    }
    for (let i = 1; i < app.values.uncoveredArea.length; i++) {
      this.addUncovereArea()
    }
    for (let i = 1; i < app.values.identificationNewSource.length; i++) {
      this.addidentificationNewSource()
    }
    for (let i = 1; i < app.values.applicationFormsWards.length; i++) {
      this.addApplicationFormWard()
    }
    for (let i = 1; i < app.values.pra.length; i++) {
      this.addPRA()
    }
    this.applicationForm.patchValue(app.values);
    console.log(this.applicationForm)
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
    this.applicationForm.reset()
    this.filesToUpload = []
    this.formdata.files = [];
    (this.applicationForm.get('baselineSurwey') as FormArray).clear();
    (this.applicationForm.get('existingWssName') as FormArray).clear();
    (this.applicationForm.get('waterQuality') as FormArray).clear();
    (this.applicationForm.get('uncoveredArea') as FormArray).clear();
    (this.applicationForm.get('identificationNewSource') as FormArray).clear();
    (this.applicationForm.get('applicationFormsWards') as FormArray).clear();
    (this.applicationForm.get('pra') as FormArray).clear();
    this.addApplicationFormWard()
    this.addBaselineSurwey()
    this.addExistingWssName()
    this.addUncovereArea()
    this.addWaterQI()
    this.addidentificationNewSource()
    this.addPRA();
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
        if (this.targetDate) {
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
        if (this.targetDate) {
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
    }
  }

}


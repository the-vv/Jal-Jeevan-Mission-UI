import { ChangeDetectorRef, Component, Input, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Application, ApplicationFile } from 'src/app/models/application';
import { DataService } from 'src/app/services/data.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UserService } from 'src/app/services/user.service';
import { FileUploaderComponent } from 'src/app/shared/file-uploader/file-uploader.component';
import { ConfirmationService } from 'primeng/api';
import { Selected } from 'src/app/models/selected';


@Component({
  selector: 'app-beneficiary-contribution',
  templateUrl: './beneficiary-contribution.component.html',
  styleUrls: ['./beneficiary-contribution.component.scss']
})
export class BeneficiaryContributionComponent implements OnInit {

  @Input('print') public printMode: boolean = false;
  @Input('district') public currentDistrict: string;
  @Input('gp') public currentGp: string;
  @Input('phase') public currentPhase: string;
  @Input('name') public currentName: string;

  @ViewChildren(FileUploaderComponent)
  public uploaders: FileUploaderComponent[];

  formdata: Application = {};

  formFields: FormArray = new FormArray([]);
  isAdmin: boolean = this.user.isAdmin;
  applicationForm!: FormGroup;
  submitting: boolean = false;
  editingId: string = '';
  submitted: boolean = false;
  public isFormDisabled: boolean = false;
  isDraftMode: boolean = false;
  disabledLength: number = 0;
  totalValues: any = {};
  totalBeneficiary: number = 0;
  totalEstimatedAmount: number = 0;
  totalFullyContributedRemitted: number = 0;
  totalPartiallyContributedRemitted: number = 0;
  totalAmount: number = 0;

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    public data: DataService,
    private route: ActivatedRoute,
    private rest: RestapiService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private confirmService: ConfirmationService
  ) { }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  calculateTotals() {
    this.totalBeneficiary = 0;
    this.totalFullyContributedRemitted = 0;
    this.totalPartiallyContributedRemitted = 0;
    this.totalAmount = 0;
    for (let i = 0; i < this.applicationForm.value.rows.length; i++) {
      if (Number(this.applicationForm.value.perHouseHoldCost) &&
        Number(this.applicationForm.value.rows[i].totalBeneficiary)) {
        let teamount: number = Number(this.applicationForm.value.perHouseHoldCost) *
          Number(this.applicationForm.value.rows[i].totalBeneficiary);
        (this.applicationForm.get('rows') as FormArray).at(i).patchValue(
          { totalEstimatedAmount: teamount },
          { emitEvent: false }
        )
      } else {
        (this.applicationForm.get('rows') as FormArray).at(i).patchValue(
          { totalEstimatedAmount: 0 },
          { emitEvent: false }
        )
      }
      if (Number(this.applicationForm.value.rows[i].totalEstimatedAmount &&
        Number(this.applicationForm.value.rows[i].collectedAmount))) {
        let balanceamnt: number = Number(this.applicationForm.value.rows[i].totalEstimatedAmount) -
          Number(this.applicationForm.value.rows[i].collectedAmount);
        (this.applicationForm.get('rows') as FormArray).at(i).patchValue(
          { balanceAmount: balanceamnt },
          { emitEvent: false }
        )
      } else {
        (this.applicationForm.get('rows') as FormArray).at(i).patchValue(
          { balanceAmount: 0 },
          { emitEvent: false }
        )
      }
    }
    // console.log(this.applicationForm.value.contribution);
    this.applicationForm.value.rows.forEach(el => {
      this.totalBeneficiary += Number(el.totalBeneficiary);
      this.totalFullyContributedRemitted += Number(el.fullyContributionRemitted);
      this.totalPartiallyContributedRemitted += Number(el.partiallyContributionRemitted);
      this.totalAmount += Number(el.balanceAmount);
    });
    // for (let i = 0; i < this.applicationForm.value.contribution.length; i++) {
    //   this.addContribution()
    // }
  }

  ngAfterViewInit() {
    if (this.printMode) {
      let tempCategory: Selected = {
        district: this.currentDistrict,
        gp: this.currentGp,
        phase: this.currentPhase,
        component: this.data.getLongName(this.currentName)
      }
      this.rest.getApplications(tempCategory).subscribe(res => {
        if (res.length > 0) {
          // console.log(res)
          // this.editingId = res[0]._id;
          this.applicSelected(res[0])
          // this.showForm = false;
        } else {
          for (let i = 1; i < this.data.getWardCount(); i++) {
            this.addRow();
          }
        }
      })
    } else {
      this.rest.getApplications(this.data.selectedDetails)
        .subscribe(res => {
          // console.log(res)
          if (res.length > 0) {
            if (res[0].editable === true) {
              this.isDraftMode = true;
            }
            else {
              this.isDraftMode = false;
            }
            this.editingId = res[0]._id;
            if (res[0].values) {
              this.applicSelected(res[0]);
            }
          }
          else {
            this.isFormDisabled = false;
            for (let i = 1; i < this.data.getWardCount(); i++) {
              this.addRow();
            }
          }
        }, e => {
          // console.log(e.error)
          this.snackBar.open('Something went wrong, Please try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
        })
    }
    this.applicationForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.calculateTotals();
    })
  }

  addRow() {
    this.formFields = this.applicationForm.get('rows') as FormArray;
    const group = this.newRow();
    this.formFields.push(group);
  }

  newRow(): FormGroup {
    return this.formBuilder.group({
      totalBeneficiary: '',
      totalEstimatedAmount: '',
      fullyContributionRemitted: '',
      partiallyContributionRemitted: '',
      collectedAmount: '',
      balanceAmount: '',
      bankIndex: ''
    })
  }

  removeMeeting(index: number) {
    let allFilesFieldsToDelete: any = {};
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el]?.length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item]?.length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('rows') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000, panelClass: 'bg-success' })
          }, err => {
            this.formFields = this.applicationForm.get('rows') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
          })
      }
      catch (e) {
        console.log(e)
        this.formFields = this.applicationForm.get('rows') as FormArray;
        this.formFields.removeAt(index)
      }
    } else {
      this.formFields = this.applicationForm.get('rows') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      perHouseHoldCost: '',
      rows: this.formBuilder.array([
        this.newRow()
      ]),
      bankStatementIndex: '',
      statementDate: ''
    })
    //add ward count rows to formgrou row array
    this.route.url.subscribe((val) => {
      // console.log(val)
      this.formdata.name = `other-activities/${val.map(v => v.path).join('/')}`
      // console.log(`iec-activities/${val.map(v => v.path).join('/')}`)
    })
  }
  get f() { return this.applicationForm.controls }

  public async onSubmit() {
    // let confirmation = await this.confirmSubmit();
    // if (!confirmation) {
    //   return;
    // }
    if (this.uploaders.some(el => el.checkUploadStatus())) {
      this.snackBar.open('Please wait for the file uploads to complete', 'Dismiss', { duration: 5000, panelClass: 'bg-warning' })
      return;
    }
    if (this.editingId.length > 0) {
      this.formdata._id = this.editingId
    }
    // console.log('No attatchments, continuing');
    this.formdata.values = this.applicationForm.value;
    this.formdata.category = this.data.selectedDetails;
    this.formdata.datetime = new Date();
    // console.log(this.formdata)
    this.submitting = true;
    this.sendApplication(this.formdata, this.editingId.length > 0)
  }

  sendApplication(app: Application, update: boolean = false, silent: boolean = false) {
    if (!silent) {
      app.submitted = true;
    }
    if (update) {
      this.rest.editApplication(app)
        .subscribe(res => {
          // console.log(res)
          this.submitting = false;
          if (!silent) {
            this.editingId = '';
            this.applicationForm.reset()
            this.formdata.files = [];
            this.applicationForm.reset()
            this.applicSelected(res)
            this.snackBar.open('Application Submitted Successfully', 'Dismiss', { duration: 5000, panelClass: 'bg-success' })
            this.submitted = true;            
          }
          this.editingId = res._id;
        }, e => {
          // console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submiting application, Please try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
        })
    }
    else {
      this.rest.submitApplication(app)
        .subscribe(res => {
          // console.log(res)
          this.submitting = false;
          if (!silent) {
            this.editingId = '';
            this.applicationForm.reset()
            this.formdata.files = [];
            this.applicationForm.reset()
            this.applicSelected(res)
            this.snackBar.open('Application Submitted Successfully', 'Dismiss', { duration: 5000, panelClass: 'bg-success' })
            this.submitted = true;            
          }
          this.editingId = res._id;
        }, e => {
          // console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submiting application, Please try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
        })
    }
  }

  applicSelected(app: Application) {
    //  
    this.onReset();
    this.formFields = this.applicationForm.get('rows') as FormArray
    this.formFields.clear();
    if (app.editable === true) {
      this.isDraftMode = true;
    }
    else {
      this.isDraftMode = false;
    }
    this.editingId = app._id
    for (let i = 0; i < app.values.rows.length; i++) {
      this.addRow()
    }
    this.applicationForm.patchValue(app.values);
    //  
    this.isFormDisabled = !app.editable;
    setTimeout(() => {
      this.isFormDisabled = false; 
    });
    // this.disabledLength = app.values.rows.length;
    //  
    // this.findTotal()
  }

  onReset() {
    this.editingId = '';
    this.applicationForm.reset();
    this.formdata.files = []
    this.formFields = this.applicationForm.get('rows') as FormArray
    this.formFields.clear();
    this.addRow()
  }

  hasAttatchment(files: ApplicationFile[] | undefined) {
    return (files as ApplicationFile[]).length > 0
  }

  onFileChanges() {
    if (this.editingId.length)
      this.formdata._id = this.editingId
    this.formdata.values = this.applicationForm.value;
    this.formdata.category = this.data.selectedDetails;
    this.formdata.datetime = new Date();
    this.sendApplication(this.formdata, !!this.editingId.length, true)
  }

  confirmSubmit() {
    return new Promise((resolve, reject) => {
      this.confirmService.confirm({
        blockScroll: false,
        message: '<p align="left" style="padding: 0px; margin: 0px">Are you sure that you want to submit?<br> Once submitted, You are not allowed to edit unless admin permitted.</p>',
        accept: () => {
          resolve(true)
        },
        reject: () => {
          resolve(false)
        }
      });    
    })
  }

  findTotal() {
    this.applicationForm.value.rows.forEach(el => {
      // go through each key value and add to total if the value is convertible to number
      Object.keys(el).forEach(key => {
        if (Number.isNaN(Number(el[key]))) {
          if (this.totalValues[key]) {
            this.totalValues[key] += 0
          } else {
            this.totalValues[key] = 0
          }
        } else {
          if (this.totalValues[key]) {
            this.totalValues[key] += Number(el[key])
          } else {
            this.totalValues[key] = Number(el[key])
          }
        }
      })
    })
  }

  getReportControl() {
    return this.applicationForm.get('report') as FormGroup;
  }

}


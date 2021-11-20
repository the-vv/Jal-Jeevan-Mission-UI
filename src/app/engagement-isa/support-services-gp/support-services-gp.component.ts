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
  selector: 'app-support-services-gp',
  templateUrl: './support-services-gp.component.html',
  styleUrls: ['./support-services-gp.component.scss']
})
export class SupportServicesGpComponent implements OnInit {

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
  public isFormDisabled: boolean = true;
  isDraftMode: boolean = false;
  disabledEwssLength: number = 0;
  disabledNwssLength: number = 0;
  disabledIommLength: number = 0;
  disabledIaomLength: number = 0;
  disabledFoamLength: number = 0;
  disabledDapdLength: number = 0;
  disabledSigpiasLength: number = 0;
  totalValues: any = {};

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
          }
        }, e => {
          // console.log(e.error)
          this.snackBar.open('Something went wrong, Please try again later', 'Dismiss', { duration: 5000 })
        })
    }
    this.applicationForm.valueChanges.subscribe(() => {
      this.submitted = false;
    })
  }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      ewsss: this.formBuilder.array([
        this.newEwsss()
      ]),
      nwsss: this.formBuilder.array([
        this.newNwss()
      ]),
      iomms: this.formBuilder.array([
        this.newIomm()
      ]),
      iaoms: this.formBuilder.array([
        this.newIaom()
      ]),
      fomas: this.formBuilder.array([
        this.newFoma()
      ]),
      dapds: this.formBuilder.array([
        this.newDapd()
      ]),
      sigpias: this.formBuilder.array([
        this.newSigpia()
      ]),
      report: '',
      completedDate: ''
    })
    this.route.url.subscribe((val) => {
      // console.log(val)
      this.formdata.name = `engagement-isa/${val.map(v => v.path).join('/')}`
      // console.log(`iec-activities/${val.map(v => v.path).join('/')}`)
    })
  }
  get f() { return this.applicationForm.controls }

  addEwss() {
    this.formFields = this.applicationForm.get('ewsss') as FormArray;
    const group = this.newEwsss();
    this.formFields.push(group);
  }

  newEwsss(): FormGroup {
    return this.formBuilder.group({
      name: '',
      ward: '',
      totalHss: '',
      tankCapacity: '',
      typeOfSource: '',
      issue: '',
      copyAssetRegister: ''
    });
  }

  addNwss() {
    const group = this.newNwss();
    (this.applicationForm.get('nwsss') as FormArray).push(group);
  }

  newNwss(): FormGroup {
    return this.formBuilder.group({
      name: '',
      ward: '',
      totalHss: '',
      tankCapacity: '',
      typeOfSource: '',
      issue: '',
      copyAssetRegister: ''
    });
  }

  addIomm() {
    const group = this.newIomm();
    (this.applicationForm.get('iomms') as FormArray).push(group);
  }

  newIomm(): FormGroup {
    return this.formBuilder.group({
      report: '',
      copyOMModel: '',
    });
  }

  addIaom() {
    const group = this.newIaom();
    (this.applicationForm.get('iaoms') as FormArray).push(group);
  }

  newIaom(): FormGroup {
    return this.formBuilder.group({
      report: '',
    });
  }

  addFoma() {
    const group = this.newFoma();
    (this.applicationForm.get('fomas') as FormArray).push(group);
  }

  newFoma(): FormGroup {
    return this.formBuilder.group({
      oByLaw: '',
      agreement: ''
    });
  }

  addDapd() {
    const group = this.newDapd();
    (this.applicationForm.get('dapds') as FormArray).push(group);
  }

  newDapd(): FormGroup {
    return this.formBuilder.group({
      report: '',
      successStories: '',
      photos: '',
      videos: ''
    });
  }

  addSigpia() {
    const group = this.newSigpia();
    (this.applicationForm.get('sigpias') as FormArray).push(group);
  }

  newSigpia(): FormGroup {
    return this.formBuilder.group({
      report: '',
      photos: '',
      videos: ''
    });
  }

  removeSigpia(index: number) {
    let allFilesFieldsToDelete: any = {
      report: this.applicationForm.get('sigpias')['controls'][index].value.report,
      photos: this.applicationForm.get('sigpias')['controls'][index].value.photos,
      videos: this.applicationForm.get('sigpias')['controls'][index].value.videos,
    }
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el]?.length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item].length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('sigpias') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
          }, err => {
            this.formFields = this.applicationForm.get('sigpias') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      catch (e) {
        // console.log(e)
        this.formFields = this.applicationForm.get('sigpias') as FormArray;
        this.formFields.removeAt(index)
      }
    } else {
      this.formFields = this.applicationForm.get('sigpias') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  removeDapd(index: number) {
    let allFilesFieldsToDelete: any = {
      report: this.applicationForm.get('dapds')['controls'][index].value.report,
      successStories: this.applicationForm.get('dapds')['controls'][index].value.successStories,
      photos: this.applicationForm.get('dapds')['controls'][index].value.photos,
      videos: this.applicationForm.get('dapds')['controls'][index].value.videos,
    }
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el]?.length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item].length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('dapds') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
          }, err => {
            this.formFields = this.applicationForm.get('dapds') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      catch (e) {
        // console.log(e)
        this.formFields = this.applicationForm.get('dapds') as FormArray;
        this.formFields.removeAt(index)
      }
    } else {
      this.formFields = this.applicationForm.get('dapds') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  removeFoma(index: number) {
    let allFilesFieldsToDelete: any = {
      oByLaw: this.applicationForm.get('fomas')['controls'][index].value.oByLaw,
      agreement: this.applicationForm.get('fomas')['controls'][index].value.agreement
    }
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el]?.length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item].length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('fomas') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
          }, err => {
            this.formFields = this.applicationForm.get('fomas') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      catch (e) {
        console.log(e)
        this.formFields = this.applicationForm.get('fomas') as FormArray;
        this.formFields.removeAt(index)
      }
    } else {
      this.formFields = this.applicationForm.get('fomas') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  removeIaom(index: number) {
    let allFilesFieldsToDelete: any = {
      report: this.applicationForm.get('iaoms')['controls'][index].value.report
    }
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el]?.length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item].length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('iaoms') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
          }, err => {
            this.formFields = this.applicationForm.get('iaoms') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      catch (e) {
        // console.log(e)
        this.formFields = this.applicationForm.get('iaoms') as FormArray;
        this.formFields.removeAt(index)
      }
    } else {
      this.formFields = this.applicationForm.get('iaoms') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  removeIomm(index: number) {
    let allFilesFieldsToDelete: any = {
      report: this.applicationForm.get('iomms')['controls'][index].value.report,
      copyOMModel: this.applicationForm.get('iomms')['controls'][index].value.copyOMModel
    }
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el]?.length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item].length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('iomms') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
          }, err => {
            this.formFields = this.applicationForm.get('iomms') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      catch (e) {
        console.log(e)
        this.formFields = this.applicationForm.get('iomms') as FormArray;
        this.formFields.removeAt(index)
      }
    } else {
      this.formFields = this.applicationForm.get('iomms') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  removeEwss(index: number) {
    let allFilesFieldsToDelete: any = {
      copyAssetRegister: this.applicationForm.get('ewsss')['controls'][index].value.copyAssetRegister
    }
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el]?.length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item].length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('ewsss') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
          }, err => {
            this.formFields = this.applicationForm.get('ewsss') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      catch (e) {
        // console.log(e)
        this.formFields = this.applicationForm.get('ewsss') as FormArray;
        this.formFields.removeAt(index)
      }
    } else {
      this.formFields = this.applicationForm.get('ewsss') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  removeNwss(index: number) {
    let allFilesFieldsToDelete: any = {
      copyAssetRegister: this.applicationForm.get('nwsss')['controls'][index].value.copyAssetRegister
    }
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el]?.length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item].length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('nwsss') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
          }, err => {
            this.formFields = this.applicationForm.get('nwsss') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      catch (e) {
        console.log(e)
        this.formFields = this.applicationForm.get('nwsss') as FormArray;
        this.formFields.removeAt(index)
      }
    } else {
      this.formFields = this.applicationForm.get('nwsss') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  public async onSubmit() {
    let confirmation = await this.confirmSubmit()
    if (!confirmation) {
      return;
    }
    if (this.uploaders.some(el => el.checkUploadStatus())) {
      this.snackBar.open('Please wait for the file uploads to complete', 'Dismiss', { duration: 5000 })
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
            this.submitted = true;
            this.applicationForm.reset()
            this.applicSelected(res)
            this.snackBar.open('Application Submitted Successfully', 'Dismiss', { duration: 5000, panelClass: 'bg-success' })
          }
          this.editingId = res._id;
        }, e => {
          // console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submiting application, Please try again later', 'Dismiss', { duration: 5000 })
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
            this.submitted = true;
            this.applicationForm.reset()
            this.applicSelected(res)
            this.snackBar.open('Application Submitted Successfully', 'Dismiss', { duration: 5000, panelClass: 'bg-success' })
          }
          this.editingId = res._id;
        }, e => {
          // console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submiting application, Please try again later', 'Dismiss', { duration: 5000 })
        })
    }
  }

  applicSelected(app: Application) {
    this.onReset();
    (this.applicationForm.get('ewsss') as FormArray).clear();
    (this.applicationForm.get('nwsss') as FormArray).clear();
    (this.applicationForm.get('iomms') as FormArray).clear();
    (this.applicationForm.get('iaoms') as FormArray).clear();
    (this.applicationForm.get('fomas') as FormArray).clear();
    (this.applicationForm.get('dapds') as FormArray).clear();
    (this.applicationForm.get('sigpias') as FormArray).clear();
    if (app.editable === true) {
      this.isDraftMode = true;
    }
    else {
      this.isDraftMode = false;
    }
    this.editingId = app._id
    for (let i = 0; i < app.values.ewsss.length; i++) {
      this.addEwss()
    }
    for (let i = 0; i < app.values.nwsss.length; i++) {
      this.addNwss()
    }
    for (let i = 0; i < app.values.iomms.length; i++) {
      this.addIomm()
    }
    for (let i = 0; i < app.values.iaoms.length; i++) {
      this.addIaom()
    }
    for (let i = 0; i < app.values.fomas.length; i++) {
      this.addFoma()
    }
    for (let i = 0; i < app.values.dapds.length; i++) {
      this.addDapd()
    }
    for (let i = 0; i < app.values.sigpias.length; i++) {
      this.addSigpia()
    }
    this.applicationForm.patchValue(app.values);
    // console.log(this.applicationForm)
    this.isFormDisabled = !app.editable;
    this.disabledEwssLength = app.values.ewsss.length;
    this.disabledNwssLength = app.values.nwsss.length;
    this.disabledIommLength = app.values.iomms.length;
    this.disabledIaomLength = app.values.iaoms.length;
    this.disabledFoamLength = app.values.fomas.length;
    this.disabledDapdLength = app.values.dapds.length;
    this.disabledSigpiasLength = app.values.sigpias.length;
  }

  onReset() {
    this.editingId = '';
    this.applicationForm.reset();
    this.formdata.files = []
    this.addEwss()
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


}

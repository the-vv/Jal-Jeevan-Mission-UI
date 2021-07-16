import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Application, ApplicationFile } from '../../models/application';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-isa-positioning',
  templateUrl: './isa-positioning.component.html',
  styleUrls: ['./isa-positioning.component.scss']
})
export class IsaPositioningComponent implements OnInit, AfterViewInit {

  formdata: Application = {
    files: []
  };
  filesToUpload: any[] = [];
  isAdmin: boolean = this.user.isAdmin;
  canUpload: boolean = false;
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
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.rest.getApplications(this.data.selectedDetails)
      .subscribe(res => {
        console.log(res)
        this.submittedApplcations = res;
        this.editingId = res[0]._id;
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
      dwsmDate: [''],
      dwsmNo: [''],
      dwsmProceedingDate: '',
      dwsmAttatchement: '',
      implementingAgency: '',
      agreementDate: [''],
      agreementNo: [''],
      agreementIndex: '',
      officeStartingDate: [''],
      officeStartingPhotoIndeex: '',
      teamLeaderAddress: [''],
      teamLeaderNo: [''],
      teamLeaderCVIndex: '',
      comminityEngAddress: [''],
      communityEngNo: [''],
      communityEngCVIndex: '',
      communityfacilAddress: [''],
      communityFacilNo: [''],
      communityFacilitatorCVIndex: ''
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
            this, this.submitting = false;
            this.snackBar.open('Error uploading File(s), Please try again later', 'Dismiss', { duration: 5000 })
          }
        })
    }
  }

  fileSelected(event: any, name: string) {
    this.submitted = false
    // console.log(event.target.files)
    this.filesToUpload.push({
      fname: `f${name}`,
      file: event.files[0]
    });
    if (name === 'agreement') {
      this.applicationForm.patchValue({ agreementIndex: `f${name}` })
      // this.agreementFile = event.files[0]
    }
    else if (name === 'dsmMeeting') {
      this.applicationForm.patchValue({ dwsmAttatchement: `f${name}` })
      // this.dsmMeetingFile = event.files[0]
    }
    else if (name === 'officeStartingPhoto') {
      this.applicationForm.patchValue({ officeStartingPhotoIndeex: `f${name}` })
      // this.officeStartingPhoto = event.files[0]
    }
    else if (name === 'leaderCV') {
      this.applicationForm.patchValue({ teamLeaderCVIndex: `f${name}` })
      // this.officeStartingPhoto = event.files[0]
    }
    else if (name === 'CommunutyEngCV') {
      this.applicationForm.patchValue({ communityEngCVIndex: `f${name}` })
      // this.officeStartingPhoto = event.files[0]
    }
    else if (name === 'CommunityFacilCV') {
      this.applicationForm.patchValue({ communityFacilitatorCVIndex: `f${name}` })
      // this.officeStartingPhoto = event.files[0]
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
            this.formdata.files = []
          }
          this.submittedApplcations.unshift(res);
          // this.applicationForm.reset()
          this.applicSelected(res);
          this.submitted = true;
        }, e => {
          console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error Submitting Application, please try again later', 'Dismiss', { duration: 5000 })
        })
    }
  }

  fileRemoved(name: string, fid: string) {
    this.submitted = false;
    this.filesToUpload = this.filesToUpload.filter(el => {
      console.log(el, name)
      return el.fname != `f${name}`
    });
    // this.applicationForm.get('contribution')['controls'][index].value.bankIndex = '';
    if (name === 'agreement') {
      this.applicationForm.patchValue({ agreementIndex: `` })
    }
    else if (name === 'dsmMeeting') {
      this.applicationForm.patchValue({ dwsmAttatchement: `` })
    }
    else if (name === 'officeStartingPhoto') {
      this.applicationForm.patchValue({ officeStartingPhotoIndeex: `` })
    } 
    else if (name === 'leaderCV') {
      this.applicationForm.patchValue({ teamLeaderCVIndex: `` })
      // this.officeStartingPhoto = event.files[0]
    }
    else if (name === 'CommunutyEngCV') {
      this.applicationForm.patchValue({ communityEngCVIndex: `` })
      // this.officeStartingPhoto = event.files[0]
    }
    else if (name === 'CommunityFacilCV') {
      this.applicationForm.patchValue({ communityFacilitatorCVIndex: `` })
      // this.officeStartingPhoto = event.files[0]
    }
    if (fid?.length) {
      console.log(this.formdata)
      this.formdata._id = this.editingId
      this.formdata.values = this.applicationForm.value
      this.formdata.files = (this.formdata.files as ApplicationFile[]).filter(el => {
        return el.fieldName != `f${name}`
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
    this.targetDate = app.targetDate;
    this.onReset();
    this.showForm = true
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
      return el.fname == `f${name}`
    })[0]
  }

  onReset() {
    this.showForm = false;
    this.editingId = '';
    this.applicationForm.reset()
    this.filesToUpload = [];
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
    }
  }
}


import { ChangeDetectorRef, Component, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Application, ApplicationFile } from 'src/app/models/application';
import { DataService } from 'src/app/services/data.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UserService } from 'src/app/services/user.service';
import { FileUploaderComponent } from 'src/app/shared/file-uploader/file-uploader.component';
import $ from 'jquery';

@Component({
  selector: 'app-wall-paintings',
  templateUrl: './wall-paintings.component.html',
  styleUrls: ['./wall-paintings.component.scss']
})
export class WallPaintingsComponent implements OnInit {

  @ViewChildren(FileUploaderComponent)
  public uploaders: FileUploaderComponent[];

  formdata: Application = {
    files: []
  };

  formFields: FormArray = new FormArray([]);
  isAdmin: boolean = this.user.isAdmin;
  applicationForm!: FormGroup;
  submitting: boolean = false;
  editingId: string = '';
  submitted: boolean = false;
  public isFormDisabled: boolean = false;

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
        if (res.length > 0) {
          this.editingId = res[0]._id;
          if (res[0].values) {
            this.applicSelected(res[0]);
          }
        }
      }, e => {
        // console.log(e.error)
        this.snackBar.open('Something went wrong, Please try again later', 'Dismiss', { duration: 5000 })
      })
    this.applicationForm.valueChanges.subscribe(() => {
      this.submitted = false;
    })
  }

  addRow() {
    this.formFields = this.applicationForm.get('rows') as FormArray;
    const group = this.newRow();
    this.formFields.push(group);
  }

  newRow() {
    return this.formBuilder.group({
      proposedSite: '',
      proposedArea: '',
      photoIndex: [''],
      completedArea: '',
      photo: '',
      video: ''
    });
  }

  removeMeeting(index: number) {
    let allFilesFieldsToDelete: any = {
      photoIndex: this.applicationForm.get('rows')['controls'][index].value.photoIndex
    }
    let control = this.applicationForm.get('rows')['controls'][index].value.photoIndex
    // Checkiing if any of the controls has the stringified file value exists
    if (Object.keys(allFilesFieldsToDelete).some(el => allFilesFieldsToDelete[el].length)) {
      try {
        let allFileIds: string[] = [];
        for (let item in allFilesFieldsToDelete) {
          if (allFilesFieldsToDelete[item].length) {
            allFileIds.push(...(JSON.parse(allFilesFieldsToDelete[item]) as ApplicationFile[]).map(el => el.fid))
          }
        }
        this.rest.deleteBulkFiles(allFileIds)
          .subscribe(res => {
            this.formFields = this.applicationForm.get('rows') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('File(s) has been deleted successfully', 'Dismiss', { duration: 5000 })
          }, err => {
            this.formFields = this.applicationForm.get('rows') as FormArray;
            this.formFields.removeAt(index)
            this.onFileChanges();
            this.snackBar.open('Error deleting file(s), Please try again later', 'Dismiss', { duration: 5000 })
          })
      }
      catch (e) {
        console.log(e)
        this.applicationForm.get('rows')['controls'][index].patchValue({ photoIndex: '' });
        this.formFields = this.applicationForm.get('rows') as FormArray;
      }
    } else {
      this.formFields = this.applicationForm.get('rows') as FormArray;
      this.formFields.removeAt(index)
    }
  }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      rows: this.formBuilder.array([
        this.newRow()
      ])
    })
    this.route.url.subscribe((val) => {
      // console.log(val)
      this.formdata.name = `iec-activities/${val.map(v => v.path).join('/')}`
      console.log(`iec-activities/${val.map(v => v.path).join('/')}`)
    })
  }
  get f() { return this.applicationForm.controls }

  onSubmit() {
    if (this.isFormDisabled) {
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
    if (this.isFormDisabled) {
      return;
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
          }
          this.applicationForm.reset()
          this.applicSelected(res)
          this.submitted = true;
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
          }
          this.applicationForm.reset()
          this.applicSelected(res)
          this.submitted = true;
        }, e => {
          // console.log(e.error.status)
          this.submitting = false;
          this.snackBar.open('Error submiting application, Please try again later', 'Dismiss', { duration: 5000 })
        })
    }
  }

  applicSelected(app: Application) {
    this.onReset();
    this.formFields = this.applicationForm.get('rows') as FormArray
    this.formFields.clear();
    this.editingId = app._id
    for (let i = 0; i < app.values.rows.length; i++) {
      this.addRow()
    }
    this.applicationForm.patchValue(app.values);
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
    this.formdata._id = this.editingId
    this.formdata.values = this.applicationForm.value
    this.sendApplication(this.formdata, !!this.editingId.length, true)
  }

}

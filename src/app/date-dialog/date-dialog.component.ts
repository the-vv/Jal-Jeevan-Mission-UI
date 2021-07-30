import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { identity } from 'lodash';
import { TargetDate } from '../models/application';
import { DataService } from '../services/data.service';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.scss']
})
export class DateDialogComponent implements OnInit {

  selectedDate: string = '';
  invalidDate: boolean = false;
  showLoader: boolean = false;
  dateForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    public data: DataService,
    private router: Router,
    private rest: RestapiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DateDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.dateForm = this.formBuilder.group({
      date: ['']
    });
    let ob = this.data.getSectionSchedule(this.inputData.section) as TargetDate;
    if (ob?.date) {
      let cdate = new Date(+ob.date).toISOString();
      this.dateForm.patchValue({ date: cdate })
    }
  }

  checkDate() {
    if (Date.parse(this.selectedDate as string)) {
      this.invalidDate = false;
    }
    else {
      this.invalidDate = true;
    }
  }

  saveDate() {
    console.log(this.dateForm.value)
    if (!this.invalidDate && Date.parse(this.dateForm.value.date)) {
      let targetValue: TargetDate = {
        section: '',
        applicationName: '',
        category: null,
        date: null,
        path: ''
      }
      targetValue.section = this.inputData.section;
      targetValue.applicationName = this.data.getLongName(this.router.url.split('/').slice(2).join('/'));
      targetValue.category = this.data.selectedDetails;
      targetValue.date = Date.parse(this.dateForm.value.date);
      targetValue.path = this.router.url.split('/').slice(2).join('/');
      console.log(targetValue);
      this.showLoader = true;
      this.rest.postSchedule(targetValue).subscribe(res => {
        this.data.clientSchedules = res;
        this.showLoader = false;
        this.snackBar.open(`Schedule set for ${this.inputData.section} successfully`, 'Dismiss', { duration: 5000 });
        this.dialogRef.close();
      }, err => {
        this.snackBar.open(err.error.status ? err.error.status + ', Please try again later' : err.statusText, 'Dismiss', { duration: 5000 });
        this.showLoader = false;
        this.dialogRef.close();
      })
    } else if(this.dateForm.value.date === null){
      // console.log('deleting date');
      this.showLoader = true;
      this.rest.deleteSchedule(this.data.selectedDetails, this.inputData.section)
      .subscribe(res => {
        this.data.clientSchedules = res;
        this.showLoader = false;
        this.snackBar.open(`Schedule deleted for ${this.inputData.section} successfully`, 'Dismiss', { duration: 5000 });
        this.dialogRef.close();
      }, err => {
        this.snackBar.open(err.error.status ? err.error.status + ', Please try again later' : err.statusText, 'Dismiss', { duration: 5000 });
        this.showLoader = false;
        this.dialogRef.close();
      })
    }
  }

}

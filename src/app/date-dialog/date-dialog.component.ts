import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TargetDate } from '../models/application';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.scss']
})
export class DateDialogComponent implements OnInit {

  selectedDate: string = '';
  invalidDate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    public data: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  checkDate() {
    if (Date.parse(this.selectedDate)) {
      this.invalidDate = false;
    }
    else {
      this.invalidDate = true;
    }
  }

  saveDate() {    
    if (!this.invalidDate && Date.parse(this.selectedDate)) {
      let temp: TargetDate = {
        section: '',
        applicationName: '',
        category: null,
        date: null,
        path: ''        
      }
      temp.section = this.inputData.section;
      temp.applicationName = this.data.getLongName(this.router.url.split('/').slice(2).join('/'));
      temp.category = this.data.selectedDetails;
      temp.date = Date.parse(this.selectedDate);
      temp.path = this.router.url.split('/').slice(2).join('/');
      console.log(temp);
    } else {
      console.log('invalid date');
    }
  }

}

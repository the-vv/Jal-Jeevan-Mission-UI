import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { pipe } from 'rxjs';
import { WardConfig } from '../models/selected';
import { DataService } from '../services/data.service';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-ward-details',
  templateUrl: './ward-details.component.html',
  styleUrls: ['./ward-details.component.scss']
})
export class WardDetailsComponent implements OnInit, AfterViewInit {

  isLoading: boolean = false;
  wardForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public data: DataService,
    private rest: RestapiService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private matDialog: MatDialogRef<WardDetailsComponent>
  ) { }

  ngOnInit(): void {
    this.wardForm = this.formBuilder.group({
      names: this.formBuilder.array([])
    })
  }

  ngAfterViewInit() {
    let wardCount = this.data.getWardCount()
    for (let i = 0; i < wardCount; i++) {
      this.addWard();
      (this.wardForm.get('names') as FormArray).at(i).patchValue({ wardNumber: i + 1 })
    }
    if(this.data.wardCongigData) {
      this.wardForm.patchValue(this.data.wardCongigData)
    } else {
      this.snackBar.open('Ward Name Configurations Unavailable, Please Try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
    }
  }

  addWard() {
    (this.wardForm.get('names') as FormArray).push(this.newWard())
  }

  newWard(): FormGroup {
    return this.formBuilder.group({
      wardNumber: '',
      wardName: ''
    })
  }

  onSubmit() {
    let configData: WardConfig = {
      category: this.data.selectedDetails,
      names: [...this.wardForm.value.names]
    }
    // console.log(configData)
    this.isLoading = true;
    this, this.rest.postWard(configData).subscribe(res => {
      this.isLoading = false;
      if (res.status === true) {
        this.snackBar.open('Ward Name Configurations Updated Successfully', 'Dismiss', { duration: 5000, panelClass: 'bg-success' })
        this.data.wardCongigData = res.wards;
        this.matDialog.close()
      } else {
        this.matDialog.close()
        this.snackBar.open('Error Updating Ward Name Configurations, Please Try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
      }
    }, err => {
      this.matDialog.close()
      this.isLoading = false;
      this.snackBar.open('Error Updating Ward Name Configurations, Please Try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
    })
  }

}

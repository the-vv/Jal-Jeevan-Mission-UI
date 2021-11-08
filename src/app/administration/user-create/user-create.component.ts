import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  allDistricts: string[] = [];
  allGPs: string[] = [];
  selectedDistrict: string = '';
  selectedGp: string = '';
  isAdmin: boolean = false;
  userForm: FormGroup;
  districtControl: FormControl;
  gpControl: FormControl;
  loading = false;

  constructor(
    public data: DataService,    
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public userType: any,
    private fb: FormBuilder,
    private rest: RestapiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.userType.isAdmin;
    this.allDistricts = this.data.getDistricts();
    this.districtControl = this.fb.control('');
    this.gpControl = this.fb.control('');
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      district: this.districtControl,
      panchayath: this.gpControl,
      admin: [this.isAdmin]
    });
    if(!this.isAdmin) {
      this.userForm.get('district').setValidators([Validators.required]);
      this.userForm.get('panchayath').setValidators([Validators.required]);
    }
  }

  onDistrictChange() {
    if (this.selectedDistrict) {
      this.allGPs = this.data.getGPs(this.selectedDistrict);
    }
    else {
      this.allGPs = [];
    }
    this.gpControl.setValue('');
  }

  onSubmit() {
    console.log(this.userForm.value);
    if(this.userForm.valid) {
      this.loading = true;
      this.rest.createUser(this.userForm.value).subscribe(
        (res) => {
          this.loading = false;
          // console.log(res);
          this.dialogRef.close(true)
          this.snackBar.open(res.message, 'Dismiss', { duration: 5000, panelClass: 'bg-success' })
        }, err => {
          // this.dialogRef.close(false)
          this.loading = false;
          this.snackBar.open(err.error.message ? err.error.message : 'Error Creating User, Try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
        })
      // this.dialogRef.close(true);
    }
  }

}

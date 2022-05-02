import { Component, OnInit } from '@angular/core';
import { RestapiService } from 'src/app/services/restapi.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-verify',
  templateUrl: './admin-verify.component.html',
  styleUrls: ['./admin-verify.component.scss']
})
export class AdminVerifyComponent implements OnInit {

  otpSend: boolean = false;
  loading: boolean = false;
  otp: number;
  otpId: string = '';

  constructor(
    private rest: RestapiService,
    private user: UserService,
    private snackbar: MatSnackBar,
    private Router: Router,
    private dialogRef: MatDialogRef<AdminVerifyComponent>,
  ) { }

  ngOnInit(): void {
  }

  sendOtp() {
    this.loading = true;
    this.rest.sendEmail(this.user.currentUser).subscribe((res) => {
      this.snackbar.open(res.message, 'Dismiss', { duration: 5000, panelClass: 'bg-success' });
      this.otpSend = true;
      this.loading = false;
      this.otpId = res.otpId;
      console.log(res)
    }, err => {
      this.loading = false;
      this.snackbar.open('Error sending verification Email, Try again later', 'Dismiss',
        { duration: 5000, panelClass: 'bg-danger' })
    })
  }

  onOtpChange() {
    this.loading = true;
    this.rest.verifyOtp({ otp: String(this.otp), otpId: this.otpId }).subscribe((res) => {
      this.loading = false;
      if (res.status === true) {
        this.snackbar.open('Verification Successful', 'Dismiss', { duration: 5000, panelClass: 'bg-success' });
        this.user.isVerifiedAdmin = true;
        this.dialogRef.close();
        this.Router.navigate(['/admin/administration']);
      } else {
        this.snackbar.open(`${res.message ? res.message : 'Verification Failed.'} , Try again`, 'Dismiss', { duration: 5000, panelClass: 'bg-danger' });
      }
    }, err => {
      this.loading = false;
      this.snackbar.open(err.error.message, 'Dismiss', { duration: 5000, panelClass: 'bg-danger' })
    })
  }

}

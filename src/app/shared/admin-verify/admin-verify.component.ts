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
      this.snackbar.open(res.message, 'Dismiss', { duration: 5000 });
      this.otpSend = true;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.snackbar.open('Error sending verification Email, Try again later', 'Dismiss', { duration: 5000 })
    })
  }

  onOtpChange() {
    this.loading = true;
    this.rest.verifyOtp(String(this.otp)).subscribe((res) => {
      this.loading = false;
      if(res.status === true) {
        this.snackbar.open('Verification Successful', 'Dismiss', { duration: 5000 });
        this.user.isVerifiedAdmin = true;
        this.dialogRef.close();
        this.Router.navigate(['/admin/administration']);
      } else {
        this.snackbar.open('Verification Failed', 'Dismiss', { duration: 5000 });
      }
    }, err => {
      this.loading = false;
      this.snackbar.open(err.error.message, 'Dismiss', { duration: 5000 })
    })
  }

}

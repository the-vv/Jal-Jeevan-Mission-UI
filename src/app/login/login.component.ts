import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private user: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.user.checkLogin()
      .then((res) => {
        if (res.admin) {
          this.router.navigate(['admin'], { replaceUrl: true })
        }
        else {
          // if(this.data.targetUrl) {
          //   console.log(this.data.targetUrl);          
          //   this.router.navigate([this.data.targetUrl], { replaceUrl: true })
          // }
          // else {            
            this.router.navigate(['client'], { replaceUrl: true })
          // }
        }
      })
      .catch((err) => {
        console.log(err)
        // this.snackBar.open(err, 'Dismiss', {duration: 5000})
      })
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }
    // console.log(this.loginForm)
    this.user.login(this.loginForm.value)
      .then((res) => {
        if (res.admin) {
          this.router.navigate(['admin'], { replaceUrl: true })
        }
        else {
          this.router.navigate(['client'], { replaceUrl: true })
        }
      })
      .catch((err) => {
        console.log(err)
        this.snackBar.open(err.statusText ? err.statusText + ', Please try again later' : err, 'Dismiss', { duration: 5000 })
      })
  }
}

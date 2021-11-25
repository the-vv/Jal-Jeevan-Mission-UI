import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestapiService } from 'src/app/services/restapi.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss']
})
export class ClaimDetailsComponent implements OnInit {

  constructor(
    private rest: RestapiService,
    private user: UserService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ClaimDetailsComponent>,
    ) { }

  ngOnInit(): void {
  }

}

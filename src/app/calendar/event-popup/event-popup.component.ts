import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.scss']
})
export class EventPopupComponent implements OnInit {

  constructor(    
    public dialogRef: MatDialogRef<EventPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public scheduleData: any,
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.scheduleData)
  }

  openComponent() {
    this.router.navigate(['/', this.user.isAdmin ? 'admin/' + this.scheduleData?.extendedProps?.path : 'client/' + this.scheduleData?.extendedProps?.path])
    .then(res => {
      if(res) {
        this.dialogRef.close();
      }
    })
  }

}

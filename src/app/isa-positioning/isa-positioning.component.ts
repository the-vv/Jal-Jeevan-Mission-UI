import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Application } from '../models/application';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-isa-positioning',
  templateUrl: './isa-positioning.component.html',
  styleUrls: ['./isa-positioning.component.scss']
})
export class IsaPositioningComponent implements OnInit {

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    public data: DataService,
    private route: ActivatedRoute,
    private rest: RestapiService
  ) { }

  formdata: Application = {
    files: []
  };
  isAdmin: boolean = this.user.isAdmin;
  canUpload: boolean = false;
  applicationForm!: FormGroup;
  dsmMeetingFile: any;
  agreementFile: any

  ngOnInit(): void {
    this.route.url.subscribe((val) => {
      this.formdata.name = val[0].path
      console.log(val[0].path)
    })
    this.canUpload = !this.user.isAdmin;
    this.applicationForm = this.formBuilder.group({
      dwsmDate: [''],
      agreementDate: [''],
      officeStartingDate: [''],
      teamLeaderAddress: [''],
      teamLeaderNo: [''],
      comminityEngAddress: [''],
      communityEngNo: [''],
      communityfacilAddress: [''],
      communityFacilNo: ['']
    })
  }
  get f() { return this.applicationForm.controls }

  onSubmit() {
    // console.log(JSON.stringify(this.applicationForm.value))
    // console.log(JSON.parse(JSON.stringify(this.applicationForm.value)))
    let form: FormData = new FormData();
    this.agreementFile && form.append('file1', this.agreementFile, this.agreementFile.name);
    this.dsmMeetingFile && form.append('file2', this.dsmMeetingFile, this.dsmMeetingFile.name);
    console.log(form)
    this.rest.uploadFiles(form)
    .subscribe((res) => {
      console.log(res)
    }, err => {
      console.warn(err.error.status)
    })
  }

  fileSelected(event: any, name: string) {
    console.log(event.target.files)
    if (name === 'agreement') {
      this.agreementFile = event.target.files[0]
    }
    else if (name === 'dsmMeeting') {
      this.dsmMeetingFile = event.target.files[0]
    }
    console.log(this.agreementFile, this.dsmMeetingFile)
  }

}


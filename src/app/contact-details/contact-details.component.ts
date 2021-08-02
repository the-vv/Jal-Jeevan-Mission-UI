import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactDetails } from '../models/user';
import { DataService } from '../services/data.service';
import { RestapiService } from '../services/restapi.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, AfterViewInit {

  contactForm: FormGroup;
  isLoading: boolean = false;
  printMode: boolean = false;
  selectedSections: string[] = ['ISA', 'IA', 'GP'];

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private user: UserService,
    private rest: RestapiService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ContactDetailsComponent>,
    public data: DataService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      isa: this.formBuilder.array([this.newPerson()]),
      ia: this.formBuilder.array([this.newPerson()]),
      gp: this.formBuilder.array([this.newPerson()]),
    });
  }

  ngAfterViewInit() {
    let details: ContactDetails;
    this.spinner.show('contact', {
      fullScreen: false,
    })
    this.rest.getContact(this.data.selectedDetails)
      .subscribe(res => {
        details = res;
        this.spinner.hide('contact');
        // console.log(res)
        if (res._id) {
          this,this.togglePrintMode();
          for (let i = 1; i < res.gp.length; i++) {
            this.addgp()
          }
          for (let i = 1; i < res.isa.length; i++) {
            this.addISA()
          }
          for (let i = 1; i < res.ia.length; i++) {
            this.addIA()
          }
          this.contactForm.patchValue(res);
        }
      })
  }

  newPerson(): FormGroup {
    return this.formBuilder.group({
      name: '',
      position: '',
      number: ''
    })
  }

  saveForm() {
    let details: ContactDetails;
    details = Object.assign({}, this.contactForm.value);
    details.category = this.data.selectedDetails;
    // console.log(details);
    this.isLoading = true;
    this.rest.postContact(details)
      .subscribe(res => {
        console.log(res)
        this.isLoading = false;
        this.dialogRef.close();
        this.snackbar.open(res.message, 'Dismiss', { duration: 5000 })
      }, e => {
        console.log(e)
        this.isLoading = false;
        this.dialogRef.close();
        this.snackbar.open('Error Saving Contact Details, Try again later', 'Dismiss', { duration: 5000 })
      })
  }

  removeIA(index: number) {
    (this.contactForm.get('ia') as FormArray).removeAt(index);
  }

  removegp(index: number) {
    (this.contactForm.get('gp') as FormArray).removeAt(index);
  }

  removeISA(index: number) {
    (this.contactForm.get('isa') as FormArray).removeAt(index);
  }

  addIA() {
    (this.contactForm.get('ia') as FormArray).push(this.newPerson());
  }

  addgp() {
    (this.contactForm.get('gp') as FormArray).push(this.newPerson());
  }

  addISA() {
    (this.contactForm.get('isa') as FormArray).push(this.newPerson());
  }

  // print(format: any) {
  //   this.printMode = true;
  //   setTimeout(() => {
  //     let exportAsConfig: ExportAsConfig = {
  //       type: format,
  //       elementIdOrContent: 'printContent',
  //       fileName: 'Contact Details'
  //     }
  //     // download the file using old school javascript method
  //     this.exportAsService.save(exportAsConfig, 'Contact Details').subscribe(() => {
  //       this.printMode = false;
  //     });
  //   }, 100);
  // }

  togglePrintMode() {
    this.printMode = !this.printMode;
  }

  print(divId: string = 'printContent') {
    this.data.printContentByDiv(divId)
  }

  onFilter(event: any) {
    console.log(event);
    console.log(this.selectedSections);
    
  }
}

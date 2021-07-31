import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  contactForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      isa: this.formBuilder.array([this.newPerson()]),
      ia: this.formBuilder.array([this.newPerson()]),
      gp: this.formBuilder.array([this.newPerson()]),
    });
    // this.spinner.show('contact', {
    //   fullScreen: false,
    // })
    // setTimeout(() => {
    //   this.spinner.hide('contact')
    // }, 1000);
    console.log(this.user.currentUser)
  }

  newPerson(): FormGroup {
    return this.formBuilder.group({
      name: '',
      position: '',
      number: ''
    })
  }

  saveForm() {

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

}

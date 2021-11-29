import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { FileUploaderComponent } from '../shared/file-uploader/file-uploader.component';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss']
})
export class ClaimDetailsComponent implements OnInit {

  @ViewChildren(FileUploaderComponent)
  public uploaders: FileUploaderComponent[];

  allPhases: any = {};
  phaseComponents: string[] = [];
  SelectedPhases: string[] = [];

  allComponents: any[] = [];
  availableComponents: any[] = [];
  selectedComponents: any[] = [];

  configData: any = environment;

  claimDetailsForm: FormGroup;

  isDisabled: boolean = false;

  constructor(
    private rest: RestapiService,
    public user: UserService,
    private snackBar: MatSnackBar,
    public data: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.claimDetailsForm = this.fb.group({
      rows: this.fb.array([]),
      totalAmount: '',
      submitGp: '',
      submitDwsm: '',
      submitKrwsa: '',
      approvedDate: '',
      approvedAmount: '',
      proceedingsFile: '',
    })
    for (const phase in this.data.phaseComponents) {
      if (Object.prototype.hasOwnProperty.call(this.data.phaseComponents, phase)) {
        this.phaseComponents.push(phase);
        this.allPhases[phase] = [];
        for (const comp of (this.data.phaseComponents as any)[phase]) {
          this.allPhases[phase].push({ comp: comp[0], phase: phase });
        }
      }
    }
    // listen for claim details form array changes and get amount and add it and patch it in total amount of formgroup
    this.claimDetailsForm.get('rows').valueChanges.subscribe(data => {
      let totalAmount = 0;
      data.forEach(row => {
        if (!isNaN(row.amount)) {
          totalAmount += Number(row.amount);
        }
      });
      this.claimDetailsForm.patchValue({ totalAmount: totalAmount });
    });
  }

  onSelectPhase() {
    this.availableComponents = [];
    for (let phase of this.SelectedPhases) {
      for (let aphase in this.allPhases) {
        if (phase === aphase) {
          this.availableComponents = [...this.availableComponents, ...this.allPhases[aphase]]
        }
      }
    }
    // traverse through selected components
    for (let comp of this.selectedComponents) {
      // check if comp.phase in selected phases, else remove from selected components
      if (!this.SelectedPhases.includes(comp.phase)) {
        this.selectedComponents.splice(this.selectedComponents.indexOf(comp), 1);
      }
    }
    const formGroup = this.claimDetailsForm.get('rows') as FormArray;
    for (let i = formGroup.controls.length - 1; i >= 0; i--) {
      const element = formGroup.controls[i].value;
      if (!this.SelectedPhases.find(x => x === element.phase)) {
        formGroup.removeAt(i);
      }
    }
  }

  onSelectComponent(e: { value: any[] }) {
    e.value.forEach(element => {
      // check if a formgroup already exists with element.phase and element.comp. ohterwise add a new one
      const formGroup = this.claimDetailsForm.get('rows') as FormArray;
      const index = formGroup.controls.findIndex(x => x.value.phase === element.phase && x.value.component === element.comp);
      if (index === -1) {
        this.addRow(element.phase, element.comp);
      }
    });
    // trverse though the formgroup and remove the ones that are not in the selected components
    const formGroup = this.claimDetailsForm.get('rows') as FormArray;
    for (let i = formGroup.controls.length - 1; i >= 0; i--) {
      const element = formGroup.controls[i].value;
      if (!e.value.find(x => x.phase === element.phase && x.comp === element.component)) {
        formGroup.removeAt(i);
      }
    }
  }

  addRow(phase: string, component: string) {
    const row = this.fb.group({
      phase,
      component,
      quantity: '',
      partFinal: '',
      amount: '',
    });
    (this.claimDetailsForm.get('rows') as FormArray).push(row);
    // console.log(this.claimDetailsForm.get('rows') as FormArray)
  }

  onFileChanges() {

  }

  onSave() {
    if (this.uploaders.some(el => el.checkUploadStatus())) {
      this.snackBar.open('Please wait for the file uploads to complete', 'Dismiss', { duration: 5000 })
      return;
    }
    this.snackBar.open('Coming Soon...!', 'Dismiss', { duration: 5000 })
  }

}

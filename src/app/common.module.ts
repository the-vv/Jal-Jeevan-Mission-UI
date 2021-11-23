import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MenuModule } from 'primeng/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

const commonModules = [
  FormsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  ReactiveFormsModule,
  MenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  InputTextareaModule,
  MatProgressBarModule,
  MatTabsModule,
  MatCardModule,
  MatDialogModule,
  MatTooltipModule,
  MatMenuModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...commonModules
  ],
  exports: [
    ...commonModules
  ]
})
export class CommonModulesModule { }

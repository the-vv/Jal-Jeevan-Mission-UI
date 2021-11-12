import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ListboxModule} from 'primeng/listbox';
import {MatSelectModule} from '@angular/material/select';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {MatChipsModule} from '@angular/material/chips';
import { ChipModule } from 'primeng/chip';
import { UserCreateComponent } from './user-create/user-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [
    AdministrationComponent,
    UserCreateComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    MatSelectModule,
    CheckboxModule,
    MultiSelectModule,
    MatChipsModule,
    ChipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ConfirmPopupModule,
  ],
  providers: [
    ConfirmationService
  ]
})
export class AdministrationModule { }

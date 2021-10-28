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


@NgModule({
  declarations: [
    AdministrationComponent
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
    MultiSelectModule
  ]
})
export class AdministrationModule { }

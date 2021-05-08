import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Selected } from '../models/selected';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedDetails: Selected = {};

  constructor() {
    
   }

  getGPs(district: string = '') {
    return [
      'Karimannur',
      'Alakodu',
      'Edavetty'
    ]
  }

}

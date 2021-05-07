import { Injectable } from '@angular/core';
import { Selected } from '../models/selected';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedDetails: Selected = {}

  constructor() { }

  getGPs(district: string = '') {
    return [
      'Karimannur',
      'Alakodu',
      'Edavetty'
    ]
  }

}

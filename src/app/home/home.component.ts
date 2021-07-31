import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../configs/app-config.enum';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public appConfig: any = AppConfig;

  constructor(
    public data: DataService
  ) { }

  ngOnInit(): void {
  }

}

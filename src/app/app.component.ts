import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
// import Darkmode from 'darkmode-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jal-Jeevan-Mission';

  constructor(
    public user: UserService,
    public data: DataService
  ) {

  }

  ngOnInit() {
    const darkModeptions = {
      // bottom: '64px', // default: '32px'
      // right: 'unset', // default: '32px'
      // left: '32px', // default: 'unset'
      time: '0.5s', // default: '0.3s'
      mixColor: '#fff', // default: '#fff'
      backgroundColor: '#fff',  // default: '#fff'
      buttonColorDark: '#aaa',  // default: '#100f2c'
      buttonColorLight: '#fff', // default: '#fff'
      saveInCookies: false, // default: true,
      label: 'Dark Mode', // default: ''
      autoMatchOsTheme: true // default: true
    }
    // new Darkmode(darkModeptions).showWidget();
  }

}

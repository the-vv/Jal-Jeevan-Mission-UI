import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/application';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wall-paintings',
  templateUrl: './wall-paintings.component.html',
  styleUrls: ['./wall-paintings.component.scss']
})
export class WallPaintingsComponent implements OnInit {

  formdata: Application = {
    files: []
  }; 
  isAdmin: boolean = this.user.isAdmin;

  constructor(
    public user: UserService,
    private route: ActivatedRoute,
    private data: DataService
    ) { }

  ngOnInit(): void {
    this.route.url.subscribe((val) => {
      console.log(val)
      if (!this.data.selectedDetails.phase) {
        this.data.selectComponent(`Planning Phase/${val[1].path}`)
      }
      this.formdata.name = `iec-activities/${val.map(v => v.path).join('/')}`
      console.log(`iec-activities/${val.map(v => v.path).join('/')}`)
    })
  }

}

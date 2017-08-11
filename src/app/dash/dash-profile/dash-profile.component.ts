import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html',
  styleUrls: ['./dash-profile.component.css']
})
export class DashProfileComponent implements OnInit {
  editMode: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

}

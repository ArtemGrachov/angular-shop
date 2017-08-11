import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {
  editMode: Boolean = false;

  constructor() { }

  ngOnInit() {
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}

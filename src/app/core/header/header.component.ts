import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }

  auth = this.authService.getAuth();
  isAdmin = this.authService.checkUserCategory(['admin']);

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}

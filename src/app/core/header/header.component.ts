import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  auth = this.authService.getAuth();
  isAdmin = this.authService.checkUserCategory(['admin']);

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}

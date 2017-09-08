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
  isAdmin = this.authService.getAuth().map(
    res => {
      if (res) {
        // admin access bug!
        return this.authService.checkUserCategory(['admin']);
      }
      return res;
    }
  );

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
}

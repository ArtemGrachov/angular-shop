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

  public user: Object = this.authService._currentUser;
  // public auth: boolean = false;
  // public isAdmin: boolean = false;

  ngOnInit() {
    // this.authService.getAuth().subscribe(
    //   res => {
    //     if (res) {
    //       this.auth = true;
    //       this.isAdmin = this.authService.checkUserCategory(['admin']);
    //       console.log(this.authService._currentUser, 'current user');
    //     } else {
    //       this.auth = false;
    //       this.isAdmin = false;
    //     }
    //   }
    // );
  }

  logout() {
    this.authService.logout();
  }
}

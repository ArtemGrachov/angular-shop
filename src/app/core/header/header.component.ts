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

  isAuth: boolean = this.authService.checkAuth();

  ngOnInit() {
    this.authService.emit.subscribe(
      () => this.isAuth = this.authService.checkAuth()
    );
  }

  logout() {
    this.authService.logout();
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }
}

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { News } from '../../shared/models/news.model';

import { NewsService } from '../news.service';
import { UsersService } from '../../admin/users.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  private newsList: any[] = [];
  private addAccess = this.authService.checkUserCategory(['admin', 'provider']);

  ngOnInit() {
    this.newsService.loadNews().subscribe(
      res => {
        this.newsList = res.sort(
          function (a, b) {
            if (a.date < b.date) {
              return 1;
            } else if (a.date > b.date) {
              return - 1;
            } else {
              return 0;
            }
          }
        );
        this.newsList.map(
          post => {
            this.usersService.loadUser(post.authorId).subscribe(
              user => post.authorName = user.name
            );
          }
        );
      }
    );
  }
}

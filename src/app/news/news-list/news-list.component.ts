import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../admin/users.service';

import { Observable } from 'rxjs/Observable';

import { News } from '../../shared/models/news.model';

import { NewsService } from '../news.service';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html'
})
export class NewsListComponent implements OnInit {
  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  public newsList: News[] = [];
  public addAccess = this.authService.checkUserCategory(['admin', 'provider']);

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
        this.newsList.forEach(
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

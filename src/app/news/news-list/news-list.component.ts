import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../admin/users.service';
import { NewsService } from '../news.service';

import { Observable } from 'rxjs/Observable';

import { News } from '../../shared/models/news.model';

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
  public addAccess = this.authService.checkUserCategory(['admin', 'provider']).map(
    res => {
      this.preloader = this.preloader.filter(str => str !== 'access');
      return res;
    }
  );
  public preloader: string[] = ['access', 'news', 'names'];

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
        this.preloader = this.preloader.filter(str => str !== 'news');
        this.newsList.forEach(
          (post, index) => {
            this.usersService.loadUser(post.authorId).subscribe(
              user => {
                post.authorName = user.name;
                if (index === this.newsList.length - 1) {
                  this.preloader = this.preloader.filter(str => str !== 'names');
                }
              }
            );
          }
        );
      }
    );
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { News } from '../../shared/models/news.model';

import { NewsService } from '../news.service';
import { UsersService } from '../../admin/users.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {

  constructor(
    public newsService: NewsService,
    public authService: AuthService,
    public usersService: UsersService
  ) { }

  newsSubscr;

  public newsList: News[];

  ngOnInit() {
    this.refreshNews();
    this.newsService.loadNews();
    this.newsSubscr = this.newsService.emit.subscribe(
      () => this.refreshNews()
    );
  }

  ngOnDestroy() {
    this.newsSubscr.unsubscribe();
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }

  refreshNews() {
    this.newsList = this.newsService.getNews().sort(
      function (a, b) {
        if (a.date < b.date) {
          return 1;
        } else if (a.date > b.date) {
          return - 1;
        }
        return 0;
      }
    );
  }

  getAuthorName(id: string): string {
    return this.usersService.getUser(id).name;
  }

  sortNewsByDate() {
    this.newsList.sort(
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
  }
}

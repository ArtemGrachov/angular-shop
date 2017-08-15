import { Component, OnInit } from '@angular/core';

import { News } from '../../shared/models/news.model';

import { NewsService } from '../news.service';
import { UsersService } from '../../admin/users.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  constructor(
    public newsService: NewsService,
    public usersService: UsersService
  ) { }

  public newsList: News[] = [];

  ngOnInit() {
    this.refreshNews();
    this.newsService.emit.subscribe(
      () => this.refreshNews()
    );
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

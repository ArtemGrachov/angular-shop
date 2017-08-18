import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

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
    public authService: AuthService,
    public usersService: UsersService
  ) { }

  public newsList: News[] = [];

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
      }
    );
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }

  getAuthorName(id: string): string {
    return this.usersService.getUser(id).name;
  }
}

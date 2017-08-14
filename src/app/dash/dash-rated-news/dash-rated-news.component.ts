import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../admin/users.service';
import { NewsService } from '../../news/news.service';

import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-dash-rated-news',
  templateUrl: './dash-rated-news.component.html',
  styleUrls: ['./dash-rated-news.component.css']
})
export class DashRatedNewsComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public newsService: NewsService
  ) { }

  news: News[] = [];

  ngOnInit() {
    this.usersService.getCurrentUser().ratedNews.map(
      (id) => {
        this.news.push(
          this.newsService.getNewsPost(id)
        );
      }
    );
  }

  getAuthorName(id: string): string {
    return this.usersService.getUser(id).name;
  }

}

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { NewsService } from '../../news/news.service';

import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-dash-rated-news',
  templateUrl: './dash-rated-news.component.html'
})
export class DashRatedNewsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private newsService: NewsService
  ) { }

  news: News[] = [];

  ngOnInit() {
    this.authService.loadCurrentUser().subscribe(
      (res: any) => {
        if (res.ratedNews) {
          for (let id of res.ratedNews) {
            this.newsService.loadPost(id).subscribe(
              post => this.news.push(post)
            );
          }
        }
      }
    );
  }

  getAuthorName(id: string): string {
    // !!!
    return 'test user name';
  }

}

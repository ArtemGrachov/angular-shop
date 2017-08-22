import { Component, OnInit } from '@angular/core';

import { NewsService } from '../../news/news.service';
import { AuthService } from '../../auth/auth.service';

import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-dash-rated-news',
  templateUrl: './dash-rated-news.component.html',
  styleUrls: ['./dash-rated-news.component.css']
})
export class DashRatedNewsComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public newsService: NewsService
  ) { }

  news: News[] = [];

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      obs => obs.subscribe(
        res => {
          if (res.ratedNews) {
            for (let id of res.ratedNews) {
              this.newsService.loadPost(id).subscribe(
                post => this.news.push(post)
              );
            }
          }
        }
      )
    );
  }

  getAuthorName(id: string): string {
    // !!!
    return 'test user name';
  }

}

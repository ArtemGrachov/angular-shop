import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { NewsService } from '../../news/news.service';
import { UsersService } from '../../admin/users.service';

import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-dash-rated-news',
  templateUrl: './dash-rated-news.component.html'
})
export class DashRatedNewsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private newsService: NewsService
  ) { }

  public news: News[] = [];
  public preloader: boolean = true;

  ngOnInit() {
    const user = this.authService._currentUser;
    if (user.ratedNews) {
      user.ratedNews.forEach(
        (id, index) => {
          this.newsService.loadPost(id).subscribe(
            post => {
              this.news.push(post);
              this.usersService.loadUser(post.authorId).subscribe(
                author => post.authorName = author.name,
                err => this.preloader = false,
                () => { if (index === user.ratedNews.length - 1) { this.preloader = false; } }
              );
            },
            err => this.preloader = false
          );
        }
      );
    } else {
      this.preloader = false;
    }
  }
}

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
  public preloader: string[] = ['user', 'news'];

  ngOnInit() {
    this.authService.loadCurrentUser().subscribe(
      (res: any) => {
        this.preloader = this.preloader.filter(str => str !== 'user');
        if (res.ratedNews) {
          for (const id of res.ratedNews) {
            this.newsService.loadPost(id).subscribe(
              post => {
                this.news.push(post);
                this.usersService.loadUser(post.authorId).subscribe(
                  user => {
                    post.authorName = user.name;
                    this.preloader = this.preloader.filter(str => str !== 'news');
                  }
                );
              }
            );
          }
        } else {
          this.preloader = this.preloader.filter(str => str !== 'news');
        }
      }
    );
  }


}

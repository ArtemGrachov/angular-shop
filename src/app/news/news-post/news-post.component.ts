import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

import { News } from '../..//shared/models/news.model';

import { NewsService } from '../../news/news.service';
import { UsersService } from '../../admin/users.service';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.css']
})
export class NewsPostComponent implements OnInit {
  constructor(public newsService: NewsService,
    public usersService: UsersService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  post: News;
  postId: string;
  auth = this.authService.getAuth();

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.postId = params['id'];
        this.loadPost();
      }
    );
  }

  loadPost() {
    this.newsService.loadPost(this.postId)
      .subscribe(
      res => {
        this.post = res;
      });
  }

  checkEditAccess() {
    // !!!
    return true;
  }

  postRate(rating: number) {
    this.newsService.ratePost(this.postId, rating).subscribe(
      updater => {
        updater.subscribe(
          () => this.loadPost()
        );
      }
    );
  }

  postDelete() {
    this.newsService.deletePost(this.postId).subscribe(
      () => this.router.navigate(['/news'])
    );
  }

  getAuthorName(id: string): string {
    // !!!
    return 'test username';
  }
}

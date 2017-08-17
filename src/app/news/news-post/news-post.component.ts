import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class NewsPostComponent implements OnInit, OnDestroy {
  post: News;
  postId: string;
  isAuth: boolean = this.authService.checkAuth();
  authSubcr;
  newsSubscr;

  constructor(public newsService: NewsService,
    public usersService: UsersService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.postId = params['id'];
      }
    );
    this.authSubcr = this.authService.emit.subscribe(
      () => this.isAuth = this.authService.checkAuth()
    );
    this.newsSubscr = this.newsService.emit.subscribe(
      () => this.refreshPost()
    );
    if (!this.post) {
      this.newsService.loadNews();
    }
  }
  ngOnDestroy() {
    this.authSubcr.unsubscribe();
    this.newsSubscr.unsubscribe();
  }

  refreshPost() {
    this.post = this.newsService.getNewsPost(this.postId);

  }

  checkEditAccess() {
    return (this.authService.checkUserCategory(['admin']) || this.usersService.getCurrentUser().id === this.post.authorId);
  }

  postRate(rating: number) {
    this.newsService.ratePost(this.postId, rating);
  }

  postEdit() {
    console.log('post edit');
  }

  postDelete() {
    this.newsService.deletePost(this.postId);
    this.router.navigate(['/news']);
  }

  getAuthorName(id: string): string {
    return this.usersService.getUser(id).name;
  }
}

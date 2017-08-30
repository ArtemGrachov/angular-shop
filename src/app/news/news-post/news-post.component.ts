import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { EditAccessService } from '../../shared/edit-access.service';
import { NewsService } from '../../news/news.service';
import { UsersService } from '../../admin/users.service';

import { News } from '../..//shared/models/news.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html'
})
export class NewsPostComponent implements OnInit {
  constructor(private newsService: NewsService,
    private usersService: UsersService,
    private authService: AuthService,
    private editAccessService: EditAccessService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public post: News;
  public postId: string;
  public auth = this.authService.getAuth().map(
    res => {
      if (!res) {
        this.preloader = this.preloader.filter(str => str !== 'access');
      }
      return res;
    }
  );
  public editAccess;
  public preloader: string[] = ['access', 'post', 'name'];

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.postId = params['id'];
        this.editAccess = this.editAccessService.newsEditAccess(this.postId).map(
          res => {
            this.preloader = this.preloader.filter(str => str !== 'access');
            return res;
          }
        );
        this.loadPost();
      }
    );
  }

  loadPost() {
    this.newsService.loadPost(this.postId)
      .subscribe(
      res => {
        this.post = res;
        this.preloader = this.preloader.filter(str => str !== 'post');
        this.usersService.loadUser(this.post.authorId).subscribe(
          user => {
            this.preloader = this.preloader.filter(str => str !== 'name');
            this.post.authorName = user.name;
          }
        );
      });
  }

  postRate(rating: number) {
    this.newsService.ratePost(this.postId, rating).subscribe(
      updater => {
        this.loadPost();
      }
    );
  }

  postDelete() {
    this.newsService.deletePost(this.postId).subscribe(
      () => this.router.navigate(['/news'])
    );
  }
}

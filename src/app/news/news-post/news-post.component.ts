import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { EditAccessService } from '../../shared/edit-access.service';

import { News } from '../..//shared/models/news.model';

import { NewsService } from '../../news/news.service';
import { UsersService } from '../../admin/users.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.css']
})
export class NewsPostComponent implements OnInit {
  constructor(private newsService: NewsService,
    private usersService: UsersService,
    private authService: AuthService,
    private editAccessService: EditAccessService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  post: News;
  postId: string;
  auth = this.authService.getAuth();
  editAccess;
  authorName;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.postId = params['id'];
        this.editAccess = this.editAccessService.newsEditAccess(this.postId);
        this.loadPost();
      }
    );

  }

  loadPost() {
    this.newsService.loadPost(this.postId)
      .subscribe(
      res => {
        this.post = res;
        this.authorName = this.usersService.loadUser(this.post.authorId).map(
          user => user.name
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

  getAuthorName(id: string): string {
    // !!!
    return 'test username';
  }
}

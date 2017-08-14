import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { News } from '../..//shared/models/news.model';

import { NewsService } from '../../news/news.service';
import { UsersService } from '../../admin/users.service';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.css']
})
export class NewsPostComponent implements OnInit {
  public post: News;
  public postId: string;

  constructor(public newsService: NewsService,
    public usersService: UsersService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.postId = params['id'];
        this.post = this.newsService.getNewsPost(this.postId);
      }
    );
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

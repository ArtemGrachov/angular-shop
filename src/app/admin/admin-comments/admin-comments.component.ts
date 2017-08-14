import { Component, OnInit } from '@angular/core';

import { CommentsService } from '../../news/comments.service';
import { NewsService } from '../../news/news.service';

import { Comment } from '../../shared/models/comment.model';
import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {

  constructor(
    public commentsService: CommentsService,
    public newsService: NewsService
  ) { }

  comments: Comment[];
  commenstCount: number;

  newsTitles: { id: string, title: string }[];

  ngOnInit() {
    this.refreshComments();
    this.commentsService.emit.subscribe(
      () => this.refreshComments()
    );
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id);
  }

  getPostTitle(id: string) {
    for (const title of this.newsTitles) {
      if (title.id === id) {
        return title.title;
      }
    }
  }

  refreshComments() {
    this.comments = this.commentsService.getComments();
    this.newsTitles = this.newsService.getNews().map(
      function (post: News) {
        return {
          id: post.id,
          title: post.title
        };
      }
    );
  }

}

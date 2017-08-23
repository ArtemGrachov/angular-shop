import { Component, OnInit } from '@angular/core';

import { CommentsService } from '../../news/comments.service';
import { NewsService } from '../../news/news.service';

import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html'
})
export class AdminCommentsComponent implements OnInit {
  constructor(
    private commentsService: CommentsService,
    private newsService: NewsService
  ) { }

  comments: Comment[];
  newsTitles: { id: string, title: string }[] = [];

  ngOnInit() {
    this.loadComments();
    this.newsService.loadNews().subscribe(
      res => {
        for (const post of res) {
          this.newsTitles.push({ id: post.id, title: post.title });
        }
      }
    );
  }

  loadComments() {
    this.commentsService.loadAllComments().subscribe(
      res => this.comments = res
    );
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id).subscribe(
      () => this.loadComments()
    );
  }
}

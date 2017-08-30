import { Component, OnInit } from '@angular/core';

import { CommentsService } from '../../news/comments.service';
import { UsersService } from '../../admin/users.service';
import { NewsService } from '../../news/news.service';

import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html'
})
export class AdminCommentsComponent implements OnInit {
  constructor(
    private commentsService: CommentsService,
    private usersService: UsersService,
    private newsService: NewsService
  ) { }

  public comments: Comment[];
  public preloader: string[] = ['comments', 'usernames', 'newstitles'];

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentsService.loadAllComments().subscribe(
      comments => {
        this.comments = comments;
        if (comments.length === 0) {
          this.preloader = [];
        }
        this.comments.forEach(
          comment => {
            this.usersService.loadUser(comment.authorId).subscribe(
              user => {
                this.preloader = this.preloader.filter(str => str !== 'usernames');
                comment.authorName = user.name;
              }
            );
            this.newsService.loadPost(comment.postId).subscribe(
              post => {
                comment.postTitle = post.title;
                this.preloader = this.preloader.filter(str => str !== 'newstitles');
              }
            );
          }
        );
        this.preloader = this.preloader.filter(str => str !== 'comments');
      }
    );
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id).subscribe(
      () => this.loadComments()
    );
  }
}

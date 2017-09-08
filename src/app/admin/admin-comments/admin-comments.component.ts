import { Component, OnInit } from '@angular/core';

import { CommentsService } from '../../news/comments.service';
import { UsersService } from '../../admin/users.service';
import { NewsService } from '../../news/news.service';

import { Comment } from '../../shared/models/comment.model';

import { Observable } from 'rxjs/Observable';

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
  public preloader: boolean = true;

  // private loader:Observable<Comment[]> = new Observable(
  //     observer => {

  //     }
  // )

  ngOnInit() {
    this.loadComments();
  }


  loadComments() {
    this.commentsService.loadAllComments().subscribe(
      comments => {
        this.comments = comments;
        this.comments.forEach(
          comment => {
            this.usersService.loadUser(comment.authorId).subscribe(
              user => comment.authorName = user.name
            );
            this.newsService.loadPost(comment.postId).subscribe(
              post => comment.postTitle = post.title
            );
          }
        );
      },
      err => { },
      () => this.preloader = false
    );
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id).subscribe(
      () => this.loadComments()
    );
  }
}

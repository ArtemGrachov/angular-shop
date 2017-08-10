import { Component, OnInit, Input } from '@angular/core';

import { CommentsService } from '../comments.service';

import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId: string;

  comments: Comment[] = [];
  newCommentForm: Boolean = false;

  constructor(
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.comments = this.commentsService.getCommentsToPost(this.postId);
    this.commentsService.emit
      .subscribe(
      () => this.comments = this.commentsService.getCommentsToPost(this.postId)
      );
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id);
  }

  toggleNewComentForm() {
    this.newCommentForm = !this.newCommentForm;
  }

}

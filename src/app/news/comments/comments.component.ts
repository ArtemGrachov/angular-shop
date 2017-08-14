import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  commentFormActive: Boolean = false;
  commentForm: FormGroup;
  constructor(
    private commentsService: CommentsService,
    public fb: FormBuilder
  ) { }


  ngOnInit() {
    this.refreshComments();
    this.commentsService.emit
      .subscribe(
      () => this.refreshComments()
      );

    this.commentForm = this.fb.group({
      'commentText': ['']
    });

  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id);
  }

  toggleNewComentForm() {
    this.commentFormActive = !this.commentFormActive;
  }

  refreshComments() {
    this.comments = this.commentsService.getCommentsToPost(this.postId);
  }

  sendComment() {
    this.commentsService.addComment(
      new Comment(
        '0',
        '0',
        this.postId,
        this.commentForm.value['commentText'],
        new Date()
      )
    );
    this.commentForm.reset();
  }

}

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
    this.comments = this.commentsService.getCommentsToPost(this.postId);
    this.commentsService.emit
      .subscribe(
      () => this.comments = this.commentsService.getCommentsToPost(this.postId)
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

  sendComment() {
    this.commentsService.addComment(
      new Comment(
        '0',
        '0',
        this.postId,
        this.commentForm.value['commentText']
      )
    );
    this.commentForm.reset();
  }

}

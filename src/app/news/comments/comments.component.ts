import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';

import { CommentsService } from '../comments.service';

import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId: string;
  isAuth: boolean = this.authService.checkAuth();

  comments: Comment[] = [];
  commentFormActive: Boolean = false;
  commentForm: FormGroup;
  constructor(
    public commentsService: CommentsService,
    public authService: AuthService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.refreshComments();
    this.commentsService.emit
      .subscribe(
      () => this.refreshComments()
      );

    this.commentForm = this.fb.group({
      'commentText': ['', Validators.required]
    });
    this.authService.emit.subscribe(
      () => this.isAuth = this.authService.checkAuth()
    );
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
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

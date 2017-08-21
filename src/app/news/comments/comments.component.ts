import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../admin/users.service';
import { CommentsService } from '../comments.service';

import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postId: string;
  constructor(
    public commentsService: CommentsService,
    public authService: AuthService,
    public usersService: UsersService,
    public fb: FormBuilder
  ) { }

  isAuth: boolean = this.authService.checkAuth();
  authSubscr;

  comments: Comment[] = [];
  commentFormActive: Boolean = false;
  commentForm: FormGroup;

  ngOnInit() {
    this.loadComments();
    this.commentForm = this.fb.group({
      'commentText': ['', Validators.required]
    });
    this.authSubscr = this.authService.emit.subscribe(
      () => this.isAuth = this.authService.checkAuth()
    );
  }

  ngOnDestroy() {
    this.authSubscr.unsubscribe();
  }

  loadComments() {
    this.commentsService.loadPostComments(this.postId).subscribe(
      res => {
        this.comments = res;
      }
    );
  }

  getCommentAuthorName(userId) {
    return this.usersService.getUser(userId).name;
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id).subscribe(
      () => this.loadComments()
    );
  }

  toggleNewComentForm() {
    this.commentFormActive = !this.commentFormActive;
  }

  // !!! user's id!
  sendComment() {
    this.commentsService.addComment(
      new Comment(
        '0',
        this.usersService.getCurrentUser().id,
        this.postId,
        this.commentForm.value['commentText'],
        new Date()
      )
    ).subscribe(
      () => this.loadComments()
      );
    this.commentForm.reset();
  }
}

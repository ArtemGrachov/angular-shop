import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../admin/users.service';
import { CommentsService } from '../comments.service';

import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
  @Input() postId: string;
  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) { }

  public comments: Comment[] = [];
  public commentFormActive: Boolean = false;
  public commentForm: FormGroup;
  public auth = this.authService.getAuth();
  public isAdmin: boolean = false;
  public preloader: string[] = ['auth', 'comments', 'names'];

  ngOnInit() {
    this.loadComments();
    this.commentForm = this.fb.group({
      'commentText': ['', Validators.required]
    });

    this.authService.checkUserCategory(['admin']).subscribe(
      res => {
        this.preloader = this.preloader.filter(str => str !== 'auth');
        return res;
      }
    );
  }

  loadComments() {
    this.commentsService.loadPostComments(this.postId).subscribe(
      res => {
        this.comments = res;
        this.preloader = this.preloader.filter(str => str !== 'comments');
        if (this.comments.length < 1) {
          this.preloader = this.preloader.filter(str => str !== 'names');
        }
        this.comments.forEach(
          (comment, index) => {
            this.usersService.loadUser(comment.authorId).subscribe(
              user => {
                comment.authorName = user.name;
                if (index === this.comments.length - 1) {
                  this.preloader = this.preloader.filter(str => str !== 'names');
                }
              }
            );
          }
        );
      }
    );
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id).subscribe(
      () => this.loadComments()
    );
  }

  toggleNewComentForm() {
    this.commentFormActive = !this.commentFormActive;
  }

  sendComment() {
    this.commentsService.addComment(
      new Comment(
        '0',
        this.authService.getUid(),
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

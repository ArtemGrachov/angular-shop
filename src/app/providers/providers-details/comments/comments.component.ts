import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../../auth/auth.service';
import { ProvidersService } from '../../providers.service';
import { UsersService } from '../../../admin/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
  constructor(
    private providersService: ProvidersService,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  comments: string[] = [];
  providerId: string;
  comment: string;
  writeCommentAccess = this.authService.checkUserCategory(['admin', 'premium']);
  deleteCommentAccess = this.authService.checkUserCategory(['admin']);

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = this.route.snapshot.parent.params['id'];
        this.loadComments();
      }
    );
  }

  loadComments() {
    this.providersService.loadProvider(this.providerId).subscribe(
      provider => {
        this.comments = provider.comments;
      }
    );
  }

  addComment() {
    this.providersService.addComment(this.providerId, this.comment).subscribe(
      res => {
        res.subscribe(
          () => {
            this.comment = '';
            this.loadComments();
          }
        );
      }
    );
  }

  deleteComment(index: string) {
    this.providersService.deleteComment(this.providerId, index).subscribe(
      res => {
        res.subscribe(
          () => this.loadComments()
        );
      }
    );
  }
}

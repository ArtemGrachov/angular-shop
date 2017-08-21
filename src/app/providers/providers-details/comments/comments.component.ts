import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../../auth/auth.service';
import { ProvidersService } from '../../providers.service';
import { UsersService } from '../../../admin/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  constructor(
    public providersService: ProvidersService,
    public usersService: UsersService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  comments: string[] = [];
  providerId: string;
  comment: string;

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
      updater => {
        updater.subscribe(
          () => this.loadComments()
        );
      }
    );
  }
}

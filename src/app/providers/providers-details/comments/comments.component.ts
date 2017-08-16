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
  comments: string[] = [];
  providerId: string = '';
  comment: string = '';

  constructor(
    public providersService: ProvidersService,
    public usersService: UsersService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = this.route.snapshot.parent.params['id'];
        this.comments = this.providersService.getProvider(this.providerId).comments;
      }
    );
  }

  addComment() {
    if (this.comment.length > 0) {
      this.providersService.addComment(this.providerId, this.comment);
      this.comment = '';
    }
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }
}

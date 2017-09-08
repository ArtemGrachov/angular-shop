import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../admin/users.service';
import { NewsService } from '../../news/news.service';

import { News } from '../../shared/models/news.model';
import { User } from '../../shared/models/user.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html'
})
export class NewsEditComponent implements OnInit {
  constructor(
    private newsService: NewsService,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  post: News = new News(
    '0',
    '',
    '',
    0,
    this.authService.getCurrentUser().id,
    new Date()
  );

  public postId: string;
  public editMode = false;
  public newsEditForm: FormGroup;
  public users: User[] = [];
  public isAdmin = this.authService.checkUserCategory(['admin']);
  public preloader: boolean = true;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.postId = params['id'];
          this.newsService.loadPost(this.postId).subscribe(
            res => {
              this.post = res;
              this.buildPostForm();
            }
          );
          this.editMode = true;
        } else {
          this.buildPostForm();
        }
      }
    );

    if (this.isAdmin) {
      this.usersService.loadUsers().subscribe(
        users => this.users = users
      );
    }
  }

  submitPost() {
    if (this.editMode) {
      const editedPost = this.newsEditForm.value;
      editedPost.id = this.postId;
      if (editedPost.date.jsdate) {
        editedPost.date = editedPost.date.jsdate;
      }
      this.newsService.updatePost(editedPost).subscribe(
        () => this.router.navigate(['../'], { relativeTo: this.route })
      );
    } else {
      this.newsService.addPost(this.newsEditForm.value).subscribe(
        () => this.router.navigate(['../'], { relativeTo: this.route })
      );
    }
  }

  buildPostForm() {
    this.preloader = false;
    this.newsEditForm = this.fb.group({
      'title': [
        this.post.title,
        Validators.required
      ],
      'content': [
        this.post.content,
        Validators.required
      ],
      'rating': [
        this.post.rating,
        Validators.required
      ],
      'authorId': [
        this.post.authorId,
        Validators.required
      ],
      'date': [
        this.post.date,
        Validators.required
      ]
    });
  }

  reset() {
    this.newsEditForm.patchValue(this.post);
  }

  delete() {
    this.newsService.deletePost(this.post.id).subscribe(
      () => {
        this.router.navigate(['../', { relativeTo: this.route }]);
      }
    );
  }

  cancel() {
    this.router.navigate(['../', { relativeTo: this.route }]);
  }
}

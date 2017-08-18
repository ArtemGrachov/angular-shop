import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

import { NewsService } from '../../news/news.service';
import { UsersService } from '../../admin/users.service';

import { News } from '../../shared/models/news.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  constructor(
    public newsService: NewsService,
    public usersService: UsersService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public fb: FormBuilder
  ) { }

  post: News = new News(
    '0',
    '',
    '',
    0,
    this.usersService.getCurrentUser().id,
    new Date()
  );

  postId: string;
  editMode = false;
  newsEditForm: FormGroup;
  users: User[] = [];

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
        this.users = this.usersService.getUsers();
      }
    );
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }

  submitPost() {
    if (this.editMode) {
      let editedPost = this.newsEditForm.value;
      editedPost.id = this.postId;
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
      () => this.router.navigate(['../', { relativeTo: this.route }])
    );
  }

  cancel() {
    this.router.navigate(['../', { relativeTo: this.route }]);
  }
}

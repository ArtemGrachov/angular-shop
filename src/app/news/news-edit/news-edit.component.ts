import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { News } from '../..//shared/models/news.model';

import { NewsService } from '../../news/news.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  post: News = new News(
    '0',
    '',
    '',
    0,
    '',
    new Date()
  );

  postId: string;
  editMode = false;
  newsEditForm: FormGroup;

  constructor(public newsService: NewsService,
    public router: Router,
    public route: ActivatedRoute,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.postId = params['id'];
          this.post = this.newsService.getNewsPost(this.postId);
          this.editMode = true;
        }
      }
    );
    this.buildPostForm();
  }
  submitPost() {
    if (this.editMode) {
      // ?????????????????????
      let editedPost = this.newsEditForm.value;
      editedPost.id = this.postId;
      this.newsService.updatePost(editedPost);
    } else {
      this.newsService.addPost(this.newsEditForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  buildPostForm() {
    this.newsEditForm = this.fb.group({
      'title': [
        this.post.title,
        Validators.required
      ],
      'content': [
        this.post.content,
        [Validators.required,
        Validators.minLength(50)]
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
    this.newsService.deletePost(this.post.id);
    this.router.navigate(['../', { relativeTo: this.route }]);
  }

  cancel() {
    this.router.navigate(['../', { relativeTo: this.route }]);
  }
}

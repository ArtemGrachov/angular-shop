import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../products/products.service';
import { CommentsService } from '../../news/comments.service';
import { NewsService } from '../../news/news.service';

import { Product } from '../../shared/models/product.model';
import { Comment } from '../../shared/models/comment.model';
import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-admin-stat',
  templateUrl: './admin-stat.component.html',
  styleUrls: ['./admin-stat.component.css']
})
export class AdminStatComponent implements OnInit {

  constructor(
    public productsService: ProductsService,
    public commentsService: CommentsService,
    public newsService: NewsService,
  ) { }

  products: Product[];
  productsCount: number;

  comments: Comment[];
  commenstCount: number;

  news: News[];
  newsCount: number;

  ngOnInit() {
    this.products = this.productsService.getLatest(3);
    this.productsCount = this.productsService.getCount();
    this.comments = this.commentsService.getLatest(3);
    this.commenstCount = this.commentsService.getCount();
    this.news = this.newsService.getLatest(3);
    this.newsCount = this.newsService.getCount();
  }

}

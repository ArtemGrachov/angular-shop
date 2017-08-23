import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../products/products.service';
import { CommentsService } from '../../news/comments.service';
import { NewsService } from '../../news/news.service';
import { OrdersService } from '../orders.service';
import { UsersService } from '../users.service';

import { Product } from '../../shared/models/product.model';
import { Comment } from '../../shared/models/comment.model';
import { News } from '../../shared/models/news.model';
import { Order } from '../../shared/models/order.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-stat',
  templateUrl: './admin-stat.component.html'
})
export class AdminStatComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private commentsService: CommentsService,
    private newsService: NewsService,
    private ordersService: OrdersService,
    private usersService: UsersService
  ) { }

  products: Product[];
  productsCount;

  comments: Comment[];
  commenstCount;

  news: News[];
  newsCount;

  orders: Order[];
  ordersCount;

  users: User[];
  usersCount;

  ngOnInit() {
    this.newsService.getLatest(3).subscribe(res => this.news = res);
    this.commentsService.getLatest(3).subscribe(res => this.comments = res);
    this.ordersService.getLatest(3).subscribe(res => this.orders = res);
    this.productsService.getLatest(3).subscribe(res => this.products = res);
    this.usersService.getLatest(3).subscribe(res => this.users = res);

    this.newsCount = this.newsService.getCount();
    this.ordersCount = this.ordersService.getCount();
    this.productsCount = this.productsService.getCount();
    this.commenstCount = this.commentsService.getCount();
    this.usersCount = this.usersService.getCount();
  }

  getOrderProductsCount(id: string): number {
    for (const order of this.orders) {
      if (order.id === id) {
        return order.products.length;
      }
    }
  }

  getOrderPrice(order) {
    return this.ordersService.getOrderPrice(order);
  }
}

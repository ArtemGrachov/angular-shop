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
  templateUrl: './admin-stat.component.html',
  styleUrls: ['./admin-stat.component.css']
})
export class AdminStatComponent implements OnInit {

  constructor(
    public productsService: ProductsService,
    public commentsService: CommentsService,
    public newsService: NewsService,
    public ordersService: OrdersService,
    public usersService: UsersService
  ) { }

  products: Product[];
  productsCount: number;

  comments: Comment[];
  commenstCount: number;

  news: News[];
  newsCount: number;

  orders: Order[];
  ordersCount: number;

  users: User[];
  usersCount: number;

  ngOnInit() {
    // this.products = this.productsService.getLatest(3);
    // this.productsCount = this.productsService.getCount();
    // this.comments = this.commentsService.getLatest(3);
    // this.commenstCount = this.commentsService.getCount();
    // this.news = this.newsService.getLatest(3);
    // this.orders = this.ordersService.getLatest(3);
    // this.ordersCount = this.ordersService.getCount();
    // this.users = this.usersService.getLatest(3);
    // this.usersCount = this.usersService.getCount();


    this.newsService.getCount().subscribe(
      res => this.newsCount = res
    );
    this.newsService.getLatest(3).subscribe(
      res => this.news = res
    );
  }

  getOrderProductsCount(id: string): number {
    for (const order of this.orders) {
      if (order.id === id) {
        return order.products.length;
      }
    }
  }

  getOrderPrice(id: string): number {
    return this.ordersService.getOrderPrice(id);
  }

}

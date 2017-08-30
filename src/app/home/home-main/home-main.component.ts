import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../products/products.service';
import { NewsService } from '../../news/news.service';
import { UsersService } from '../../admin/users.service';

import { Product } from '../../shared/models/product.model';
import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html'
})
export class HomeMainComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private newsService: NewsService
  ) { }

  public products: Product[] = [];
  public newsList: News[] = [];
  public preloader: string[] = ['products', 'news'];

  ngOnInit() {
    this.loadProducts();
    this.loadNews();
  }

  loadProducts() {
    this.productsService.getLatest(4).subscribe(
      res => {
        this.products = res;
        this.preloader = this.preloader.filter(str => str !== 'products');
      }
    );
  }

  loadNews() {
    this.newsService.getLatest(4).subscribe(
      news => {
        this.newsList = news;
        this.newsList.forEach(
          post => {
            this.usersService.loadUser(post.authorId).subscribe(
              user => {
                post.authorName = user.name;
                this.preloader = this.preloader.filter(str => str !== 'news');
              }
            );
          }
        );
      }
    );
  }
}

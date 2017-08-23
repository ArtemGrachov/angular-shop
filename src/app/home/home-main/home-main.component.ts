import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../products/products.service';
import { NewsService } from '../../news/news.service';

import { Product } from '../../shared/models/product.model';
import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html'
})
export class HomeMainComponent implements OnInit {

  products: Product[] = [];
  news: News[] = [];

  constructor(
    private productsService: ProductsService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadNews();
  }

  loadProducts() {
    this.productsService.getLatest(4).subscribe(
      res => this.products = res
    );
  }

  loadNews() {
    this.newsService.getLatest(4).subscribe(
      res => this.news = res
    );
  }

}

import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../products/products.service';
import { NewsService } from '../../news/news.service';

import { Product } from '../../shared/models/product.model';
import { News } from '../../shared/models/news.model';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  products: Product[] = [];
  news: News[] = [];

  constructor(
    public productsService: ProductsService,
    public newsService: NewsService
  ) { }

  ngOnInit() {
    this.products = this.productsService.getLatest(4);
    this.news = this.newsService.getLatest(3);
  }

}

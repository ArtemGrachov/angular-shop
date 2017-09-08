import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../products/products.service';
import { NewsService } from '../../news/news.service';
import { UsersService } from '../../admin/users.service';

import { Product } from '../../shared/models/product.model';
import { News } from '../../shared/models/news.model';

import { Observable } from 'rxjs/Observable';

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
  public preloader: boolean = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    Observable.forkJoin(
      this.productsService.getLatest(4),
      this.newsService.getLatest(4)
    ).subscribe(
      res => {
        this.products = res[0];
        this.newsList = res[1];
        if (this.newsList.length === 0) {
          this.preloader = false;
        }
        res[1].forEach(
          (post, index) => {
            this.usersService.loadUser(post.authorId).subscribe(
              user => post.authorName = user.name,
              err => this.preloader = false,
              () => { if (index === res[1].length - 1) { this.preloader = false; } }
            );
          }
        );
      },
      err => this.preloader = false);
  }
}

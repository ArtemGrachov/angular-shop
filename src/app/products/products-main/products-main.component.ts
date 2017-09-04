import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html'
})
export class ProductsMainComponent implements OnInit, OnDestroy {
  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  public searchForm: FormGroup;
  public showSearchSort: boolean = true;
  private routeSub;

  ngOnInit() {
    this.buildForm();
    this.checkSearchSort();
    this.routeSub = this.router.events.subscribe(
      res => {
        this.checkSearchSort();
      }
    );
  }

  checkSearchSort() {
    if (this.route.firstChild.params['value']['id']) {
      this.showSearchSort = false;
    } else {
      this.showSearchSort = true;
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      'search': '',
      'sort': 'name',
      'reverse': false
    });
  }

  searchEmit() {
    this.productsService.searchEmit.emit(
      {
        sort: this.searchForm.get('sort').value,
        reverse: this.searchForm.get('reverse').value,
        search: this.searchForm.get('search').value
      }
    );
  }
}

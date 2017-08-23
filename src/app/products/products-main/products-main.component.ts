import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.css']
})
export class ProductsMainComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) { }
  searchForm: FormGroup;

  ngOnInit() {
    this.buildForm();
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

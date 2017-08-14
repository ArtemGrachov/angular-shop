import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

import { Product } from '../../shared/models/product.model';
import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  product: Product = new Product(
    '0',
    '',
    '',
    '',
    '',
    0,
    0,
    0,
    new Date()
  );
  productId: string;
  providersList: Provider[];
  productForm: FormGroup;
  editMode: Boolean = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public productsService: ProductsService,
    public providersService: ProvidersService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (this.productId = params['id']) {
          this.product = this.productsService.getProduct(this.productId);
          this.editMode = true;
        }
      }
    );
    this.providersList = this.providersService.getProviders();
    this.buildProductForm();
  }

  buildProductForm() {
    this.productForm = this.fb.group({
      'name': this.product.name,
      'imgUrl': this.product.imgUrl,
      'description': this.product.description,
      'providerId': this.product.providerId,
      'rating': this.product.rating,
      'count': this.product.count,
      'date': this.product.date,
      'price': this.product.price,
      'id': this.product.id
    });
  }
  // ID?
  submit() {
    if (this.editMode) {
      this.productsService.updateProduct(this.productForm.value);
    } else {
      this.productsService.addProduct(this.productForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  delete() {
    this.productsService.deleteProduct(this.productId);
    this.router.navigate(['products']);
  }

  reset() {
    this.productForm.patchValue(this.product);
  }
}
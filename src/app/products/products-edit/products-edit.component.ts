import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../admin/users.service';

import { Product } from '../../shared/models/product.model';
import { Provider } from '../../shared/models/provider.model';

import { greaterZero } from '../../shared/validators/greater-zero.validator';
import { isInteger } from '../../shared/validators/integer.validator';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService,
    public productsService: ProductsService,
    public providersService: ProvidersService,
    public usersService: UsersService,
    public fb: FormBuilder
  ) { }

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
  providersList: { id: string, name: string }[] = [{ id: '1502977530352', name: 'test' }];
  productForm: FormGroup;
  editMode: Boolean = false;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (this.productId = params['id']) {
          this.loadProduct();
          this.editMode = true;
        } else {
          this.buildProductForm();
        }
      }
    );
    this.providersService.loadProviders();


    this.authService.loadCurrentUser().subscribe(
      (user: any) => {
        let sub: Observable<any>;

        if (user.category === 'admin') {
          sub = this.providersService.loadProviders();
        } else {
          sub = this.providersService.getProvidersByUserId(user.id);
        }
        sub.subscribe(
          res => {
            this.providersList = res.map(
              provider => {
                return { id: provider.id, name: provider.name }
              }
            );
          }
        );
      }
    );
  }

  loadProduct() {
    this.productsService.loadProduct(this.productId).subscribe(
      res => {
        this.product = res;
        this.buildProductForm();
      }
    );
  }

  buildProductForm() {
    this.productForm = this.fb.group({
      'name': [
        this.product.name,
        Validators.required
      ],
      'imgUrl': [
        this.product.imgUrl,
        Validators.required
      ],
      'description': [
        this.product.description,
        Validators.required
      ],
      'providerId': [
        this.product.providerId,
        Validators.required
      ],
      'rating': [
        this.product.rating,
        [Validators.required]
      ],
      'count': [
        this.product.count,
        [Validators.required,
          greaterZero,
          isInteger
        ]
      ],
      'date': [
        this.product.date,
        Validators.required
      ],
      'price': [
        this.product.price,
        [Validators.required,
          greaterZero]
      ]
    });
  }

  submit() {
    this.productForm.value.id = this.product.id;
    if (this.editMode) {
      this.productsService.updateProduct(this.productForm.value).subscribe(
        () => this.router.navigate(['../'], { relativeTo: this.route })
      );
    } else {
      this.productsService.addProduct(this.productForm.value).subscribe(
        () => this.router.navigate(['../'], { relativeTo: this.route })
      );
    }
  }

  delete() {
    this.productsService.deleteProduct(this.productId).subscribe(
      () => this.router.navigate(['products'])
    );
  }

  reset() {
    this.productForm.patchValue(this.product);
  }
}

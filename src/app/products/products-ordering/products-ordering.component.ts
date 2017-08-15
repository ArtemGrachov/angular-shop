import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OrdersService } from '../../admin/orders.service';

import { Product } from '../../shared/models/product.model';
import { Order } from '../../shared/models/order.model';


@Component({
  selector: 'app-products-ordering',
  templateUrl: './products-ordering.component.html',
  styleUrls: ['./products-ordering.component.css']
})
export class ProductsOrderingComponent implements OnInit {
  cart: Product[] = [];
  price = 0;
  successMsg: boolean = false;

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.refreshOrders();
    this.productsService.emit.subscribe(
      () => this.refreshOrders()
    );
  }

  refreshOrders() {
    this.cart = this.productsService.getCart();
    this.price = this.calcTotalPrice();
  }

  calcTotalPrice() {
    let price = 0;
    for (const product of this.cart) {
      price += product.price;
    }
    return +price.toFixed(2);
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  addOrder() {
    const products: { name: string, price: number }[] = [];
    for (const product of this.cart) {
      products.push({
        name: product.name,
        price: product.price
      });
    }
    this.ordersService.addOrder(
      new Order(
        '0',
        '0',
        products,
        new Date(),
        0
      )
    );
    this.productsService.sendOrder();
    this.successMsg = true;
  }
}

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { OrdersService } from '../../admin/orders.service';

import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-dash-orders',
  templateUrl: './dash-orders.component.html'
})
export class DashOrdersComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) { }

  orders: Order[] = [];

  ngOnInit() {
    this.getUsersOrder();
  }

  getUsersOrder() {
    this.authService.loadCurrentUser().subscribe(
      (user: any) => {
        this.ordersService.getOrdersByUser(user.id).subscribe(
          res => {
            this.orders = res;
          }
        );
      }
    );
  }

  getOrderPrice(order) {
    return this.ordersService.getOrderPrice(order);
  }
}

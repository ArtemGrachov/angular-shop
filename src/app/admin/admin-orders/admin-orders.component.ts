import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../orders.service';
import { UsersService } from '../users.service';

import { Order } from '../../shared/models/order.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html'
})
export class AdminOrdersComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService
  ) { }
  public orders: Order[] = [];
  public preloader: boolean = true;


  ngOnInit() {
    this.ordersService.loadOrders().subscribe(
      res => {
        this.orders = res;
        this.orders.forEach(
          order => {
            this.usersService.loadUser(order.userId).subscribe(
              (user: any) => order.username = user.name
            );
          }
        );
      },
      err => { },
      () => this.preloader = false
    );
  }

  getOrderPrice(order): number {
    return +(this.ordersService.getOrderPrice(order) * (1 - (order.discount * 0.01))).toFixed(2);
  }
}

import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../orders.service';
import { UsersService } from '../users.service';

import { Order } from '../../shared/models/order.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    public ordersService: OrdersService,
    public usersService: UsersService
  ) { }

  ngOnInit() {
    this.ordersService.loadOrders().subscribe(
      res => this.orders = res
    );
  }
  // !!!
  getUsername(id: string): string {
    return 'test username ' + id;
  }

  getOrderPrice(order) {
    return this.ordersService.getOrderPrice(order);
  }

}

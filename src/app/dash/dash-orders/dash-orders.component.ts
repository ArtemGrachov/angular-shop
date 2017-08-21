import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../admin/orders.service';
import { UsersService } from '../../admin/users.service';

import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-dash-orders',
  templateUrl: './dash-orders.component.html',
  styleUrls: ['./dash-orders.component.css']
})
export class DashOrdersComponent implements OnInit {
  orders: Order[] = [
    new Order('1', '0', [{ name: 'Apple', price: 5.99 }], new Date(2017, 4, 4, 15, 12, 12, 100), 0),
    new Order('1', '0', [{ name: 'Coca-Cola', price: 7.99 }, { name: 'Ice Cream', price: 2.99 }], new Date(2017, 0, 3, 10, 5, 5, 0), 0),
  ];

  currentUserId: string = '';

  constructor(
    public ordersService: OrdersService,
    public usersService: UsersService
  ) { }

  ngOnInit() {
    this.currentUserId = this.usersService.currentUserId;
    this.getUsersOrder();

  }

  getUsersOrder() {
    // this.orders = this.ordersService.getOrdersByUser(this.currentUserId).sort(
    //   function (a, b) {
    //     if (a.date < b.date) {
    //       return 1;
    //     } else if (a.date > b.date) {
    //       return - 1;
    //     } else {
    //       return 0;
    //     }
    //   }
    // );
  }

}

import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../orders.service';
import { UsersService } from '../../users.service';

import { DataService } from '../../../shared/data.service';

import { Order } from '../../../shared/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
    private dataService: DataService
  ) { }
  public preloader: string[] = ['orders', 'users'];
  public orders: Order[] = [];

  ngOnInit() {
    this.ordersService.loadOrders().subscribe(
      orders => {
        this.orders = orders;
        this.orders.forEach(
          order => {
            this.usersService.loadUser(order.userId).subscribe(
              user => order.username = user.name,
              err => { },
              () => this.preloader.filter(str => str !== 'users')
            );
          }
        );
      },
      err => { },
      () => this.preloader.filter(str => str !== 'orders')
    );
  }

  getOrderPrice(order): number {
    return +(this.ordersService.getOrderPrice(order) * (1 - (order.discount * 0.01))).toFixed(2);
  }

  toCSV(table) {
    this.dataService.saveCSV(table, 'orders');
  }
}

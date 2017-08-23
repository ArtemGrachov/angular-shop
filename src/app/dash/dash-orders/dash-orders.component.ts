import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../admin/orders.service';
import { AuthService } from '../../auth/auth.service';

import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-dash-orders',
  templateUrl: './dash-orders.component.html',
  styleUrls: ['./dash-orders.component.css']
})
export class DashOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    public ordersService: OrdersService,
    public authService: AuthService
  ) { }

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

}

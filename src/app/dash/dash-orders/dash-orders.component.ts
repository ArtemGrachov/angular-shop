import { Component, OnInit } from '@angular/core';

import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-dash-orders',
  templateUrl: './dash-orders.component.html',
  styleUrls: ['./dash-orders.component.css']
})
export class DashOrdersComponent implements OnInit {
  orders: Order[] = [
    new Order('1', '0', [{ name: 'Apple', price: 5.99 }], new Date(2017, 4, 4, 15, 12, 12, 100)),
    new Order('1', '0', [{ name: 'Coca-Cola', price: 7.99 }], new Date(2017, 12, 3, 10, 5, 5, 0)),
  ];

  constructor() { }

  ngOnInit() {
  }

}

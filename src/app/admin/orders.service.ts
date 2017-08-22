import { Injectable } from '@angular/core';

import { DataService } from '../shared/data.service';
import { ProductsService } from '../products/products.service';
import { AlertsService } from '../alerts/alerts.service';

import { Order } from '../shared/models/order.model';

@Injectable()
export class OrdersService {
    constructor(
        private dataService: DataService,
        private alertService: AlertsService,
        private productService: ProductsService
    ) { }

    orders: Order[] = [];

    loadOrders() {
        return this.dataService.loadDataList('orders');
    }

    loadOrder(id: string) {
        return this.dataService.loadDataObj(`orders/${id}`);
    }

    getOrdersByUser(id: string) {
        return this.loadOrders().map(
            res => {
                let orders = [];
                for (const order of this.orders) {
                    if (order.userId === id) {
                        orders.push(order);
                    }
                }
                return orders;
            }
        );
    }

    addOrder(newOrder: Order) {
        newOrder.id = (new Date).getTime().toString();
        return this.dataService.putData('orders', newOrder).map(
            () => this.alertService.addAlert({ message: 'Thank you for order!', type: 'success' })
        );
    }

    deleteOrder(id: string) {
        return this.dataService.deleteData('orders/' + id);
    }

    getLatest(count: number) {
        return this.loadOrders().map(
            res => {
                res.sort(
                    function (a, b) {
                        if (a.date < b.date) {
                            return 1;
                        } else if (a.date > b.date) {
                            return - 1;
                        } else {
                            return 0;
                        }
                    }
                );
                return res.slice(0, count);
            }
        );
    }

    getCount() {
        return this.loadOrders().map(
            res => res.length
        );
    }

    getOrderPrice(order) {
        return +(order.products.reduce(
            (sum, product) => { return sum + product.price }, 0
        )).toFixed(2);
    }
}

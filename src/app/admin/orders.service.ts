import { Injectable, EventEmitter } from '@angular/core';

import { Order } from '../shared/models/order.model';

@Injectable()
export class OrdersService {
    orders: Order[] = [
        new Order('0', '0', [
            { name: 'Coca-Cola', price: 1.99 },
            { name: 'Bread', price: 0.99 },
            { name: 'Apple', price: 0.99 },
        ], new Date(), 0),
        new Order('1', '1', [
            { name: 'Banana', price: 1.99 },
            { name: 'Onion', price: 0.99 },
            { name: 'Honey', price: 3.99 },
        ], new Date(), 0),
        new Order('2', '0', [
            { name: 'Apple', price: 0.99 },
            { name: 'Mineral water', price: 1.99 }
        ], new Date(), 0)
    ];

    emit: EventEmitter<any> = new EventEmitter();

    getOrders(): Order[] {
        return this.orders;
    }

    getOrder(id: string): Order {
        for (const order of this.orders) {
            if (order.id === id) {
                return order;
            }
        }
    }

    addOrder(newOrder: Order) {
        // test 'unique' id
        const testId = Math.floor(Math.random() * 1000);
        newOrder.id = testId.toString();
        // test 'unique' id

        this.orders.push(newOrder);
    }

    deleteOrder(id: string) {
        for (const index in this.orders) {
            if (this.orders[index].id === id) {
                this.orders.splice(+index, 1);
            }
        }
        this.emit.emit();
    }

    getLatest(count: number): Order[] {
        const sortedOrder: Order[] = this.orders.slice().sort(
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
        return sortedOrder.slice(0, count);
    }

    getCount(): number {
        return this.orders.length;
    }

    getOrderPrice(id: string): number {
        let price: number = 0;
        for (const product of this.getOrder(id).products) {
            price += product.price;
        }
        return +price.toFixed(2);
    }
}

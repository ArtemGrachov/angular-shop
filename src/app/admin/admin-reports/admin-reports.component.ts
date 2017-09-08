import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../../shared/data.service';
import { ProductsService } from '../../products/products.service';
import { ProvidersService } from '../../providers/providers.service';
import { OrdersService } from '../orders.service';
import { UsersService } from '../users.service';

@Component({
    selector: 'app-admin-reports',
    templateUrl: './admin-reports.component.html'
})
export class AdminReportsComponent {
    constructor(
        private productsService: ProductsService,
        private providersService: ProvidersService,
        private ordersService: OrdersService,
        private usersService: UsersService,
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public tbl: any[];
    public preloader: boolean = false;
    private fileName: string = '';

    selectReport(event: any): void {
        this.preloader = true;
        switch (event.currentTarget.value) {
            case 'products':
                this.productsTable();
                break;

            case 'providers':
                this.providersTable();
                break;

            case 'users':
                this.usersTable();
                break;

            case 'orders':
                this.ordersTable();
                break;
        }
    }

    productsTable() {
        this.tbl = [['ID', 'Product', 'Price', 'Provider', 'Count', 'Date']];
        this.fileName = 'products';
        this.productsService.loadProducts().subscribe(
            products => {
                products.forEach(
                    (product, index) => {
                        this.providersService.loadProvider(product.providerId).subscribe(
                            provider => {
                                const tableRow = [];
                                tableRow.push(product.id);
                                tableRow.push(product.name);
                                tableRow.push(product.price);
                                if (provider) {
                                    tableRow.push(provider.name);
                                } else {
                                    tableRow.push('<unknown provider>');
                                }
                                tableRow.push(product.count);
                                tableRow.push(this.formatDate(product.date, true));
                                this.tbl.push(tableRow);
                                if (index === products.length - 1) {
                                    this.preloader = false;
                                }
                            },
                            err => this.preloader = false,
                            () => { if (index === products.length - 1) { this.preloader = false; } }
                        );
                    }
                );
            },
            err => this.preloader = false);
    }

    providersTable() {
        this.tbl = [['ID', 'Name', 'Rating', 'Product count']];
        this.fileName = 'providers';
        this.providersService.loadProviders().subscribe(
            providers => {
                providers.forEach(
                    (provider, index) => {
                        this.productsService.getProductsByProvider(provider.id).subscribe(
                            products => {
                                const tableRow = [];
                                tableRow.push(provider.id);
                                tableRow.push(provider.name);
                                tableRow.push(provider.rating);
                                tableRow.push(products.length);
                                this.tbl.push(tableRow);
                                if (index === providers.length - 1) {
                                    this.preloader = false;
                                }
                            },
                            err => this.preloader = false,
                            () => { if (index === providers.length - 1) { this.preloader = false; } }
                        );
                    }
                );
            },
            err => this.preloader = false
        );
    }

    usersTable() {
        this.tbl = [['Name', 'Category', 'Email', 'Registration date', 'Birthdate', 'Phone']];
        this.fileName = 'users';
        this.usersService.loadUsers().subscribe(
            users => {
                users.forEach(
                    (user, index) => {
                        const tableRow = [];
                        tableRow.push(user.name);
                        tableRow.push(user.category);
                        tableRow.push(user.email);
                        tableRow.push(this.formatDate(user.regDate, true));
                        tableRow.push(this.formatDate(user.birthdate, false));
                        tableRow.push(user.phone);
                        this.tbl.push(tableRow);
                        if (index === users.length - 1) {
                            this.preloader = false;
                        }
                    }
                );
            },
            err => this.preloader = false
        );
    }

    ordersTable() {
        this.tbl = [['ID', 'Date', 'User', 'Products', 'Delivering', 'Discount', 'Total price']];
        this.fileName = 'orders';
        this.ordersService.loadOrders().subscribe(
            orders => {
                orders.forEach(
                    (order, index) => {
                        this.usersService.loadUser(order.userId).subscribe(
                            user => {
                                const tableRow = [];
                                tableRow.push(order.id);
                                tableRow.push(this.formatDate(order.date, true));
                                if (user) {
                                    tableRow.push(user.name);
                                }
                                tableRow.push(order.products.map(
                                    product => `${product.name} (${product.provider} / $${product.price})`
                                ));
                                tableRow.push(order.deliveryPrice);
                                tableRow.push(order.discount);
                                tableRow.push((this.getOrderPrice(order) + order.deliveryPrice).toFixed(2));
                                this.tbl.push(tableRow);
                            },
                            err => this.preloader = false,
                            () => { if (index === orders.length - 1) { this.preloader = false; } }
                        );
                    }
                );
            },
            err => this.preloader = false
        );
    }

    getOrderPrice(order): number {
        return +(this.ordersService.getOrderPrice(order) * (1 - (order.discount * 0.01))).toFixed(2);
    }

    formatDate(dateStr: string, time: boolean) {
        if (dateStr) {
            const date = new Date(dateStr);
            let formatted = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
            if (time) {
                formatted = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${formatted}`;
            }
            return formatted;
        } else {
            return 'no date';
        }
    }

    toCSV() {
        this.dataService.saveCSV(this.tbl, this.fileName);
    }
}

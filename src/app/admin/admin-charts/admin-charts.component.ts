import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { ProvidersService } from '../../providers/providers.service';
import { UsersService } from '../../admin/users.service';

@Component({
    selector: 'app-admin-charts',
    templateUrl: './admin-charts.component.html'
})
export class AdminChartsComponent implements OnInit {
    constructor(
        private productsService: ProductsService,
        private providersService: ProvidersService,
        private usersService: UsersService
    ) { }

    public commonCharts = {
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        type: 'bar'
    };

    public productsChart = {
        data: [
            { data: [], label: 'Rating' },
            { data: [], label: 'Price' },
            { data: [], label: 'Count' },
        ],
        labels: []
    };

    public providersChart = {
        data: [
            { data: [], label: 'Rating' },
            { data: [], label: 'Products count' },
        ],
        labels: []
    };

    public usersCatChart = {
        data: [
            { data: [], label: 'Users' }
        ],
        labels: []
    };

    ngOnInit() {
        this.productsService.loadProducts().subscribe(
            res => {
                this.productsChart.data[0].data = res.map(product => product.rating);
                this.productsChart.data[1].data = res.map(product => product.price);
                this.productsChart.data[2].data = res.map(product => product.count);
                this.productsChart.labels = res.map(product => product.name);
            }
        );
        this.providersService.loadProviders().subscribe(
            res => {
                this.providersChart.data[0].data = res.map(provider => provider.rating);
                res.forEach(
                    provider => {
                        this.productsService.getProductsByProvider(provider.id).subscribe(
                            provProducts => {
                                this.providersChart.data[1].data.push(provProducts.length);
                                // because of ChartJS drawing
                                if (this.providersChart.data[1].data.length === res.length) {
                                    this.providersChart.labels = res.map(provider => provider.name);
                                }
                            }
                        );
                    }
                );
            }
        );
        this.usersService.loadUsers().subscribe(
            res => {
                let categories: string[] = [],
                    userCount: number[] = [];

                res.forEach(
                    user => {
                        let catIndex = categories.indexOf(user.category);
                        if (catIndex === -1) {
                            categories.push(user.category);
                            userCount.push(1);
                        } else {
                            userCount[catIndex]++;
                        }

                    }
                );
                this.usersCatChart.data[0].data = userCount;
                this.usersCatChart.labels = categories;
            }
        );
    }
}

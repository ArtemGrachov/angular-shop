import { Component, OnInit } from '@angular/core';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { ProductsService } from '../products.service';
import { OrdersService } from '../../admin/orders.service';

import { Product } from '../../shared/models/product.model';
import { Order } from '../../shared/models/order.model';

class Shop {
  public lat: number;
  public lng: number;
  public iconUrl: string;
  public opacity: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    this.iconUrl = 'assets/img/shop.png';
    this.opacity = 0.5;
  }
}

declare var google: any;

@Component({
  selector: 'app-products-ordering',
  templateUrl: './products-ordering.component.html',
  styleUrls: ['./products-ordering.component.css']
})
export class ProductsOrderingComponent implements OnInit {
  cart: Product[] = [];
  price = 0;
  successMsg: boolean = false;

  gmap = {
    lat: 48.698200,
    lng: 26.575637,
    zoom: 16
  };
  gmapObj: any;
  fromPos = {
    lat: this.gmap.lat,
    lng: this.gmap.lng
  };
  public toPos = {
    lat: this.gmap.lat,
    lng: this.gmap.lng
  };
  clientMarkerUrl: string = 'assets/img/client.png';
  deliveryType: string = 'DRIVING';

  shops: Shop[] = [
    new Shop(48.698200, 26.575637),
    new Shop(48.689785, 26.579571),
    new Shop(48.681764, 26.589226),
  ];
  dirService: any;
  dirDisplay: any;
  deliveryInfo = {
    price: 0,
    distance: 0,
    time: 0,
    display: false
  };

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public gmapAPI: GoogleMapsAPIWrapper
  ) {
  }

  ngOnInit() {
    this.refreshOrders();
    this.productsService.emit.subscribe(
      () => this.refreshOrders()
    );
  }

  mapReady(event) {
    this.gmapObj = event;
    this.gmapDir();
  }

  gmapDir() {
    this.dirService = new google.maps.DirectionsService;
    this.dirDisplay = new google.maps.DirectionsRenderer({
      map: this.gmapObj,
      suppressMarkers: true
    });
  }

  calcDirection() {
    const _this = this;

    this.dirService.route({
      origin: {
        lat: this.fromPos.lat,
        lng: this.fromPos.lng
      },
      destination: {
        lat: this.toPos.lat,
        lng: this.toPos.lng
      },
      travelMode: this.deliveryType
    }, function (res) {
      const dist = +(res.routes[0].legs[0].distance.value / 1000).toFixed(1),
        price = dist * 1,
        time = Math.round(res.routes[0].legs[0].duration.value / 60);

      _this.deliveryInfo.price = price;
      _this.deliveryInfo.distance = dist;
      _this.deliveryInfo.time = time;
      _this.deliveryInfo.display = true;

      _this.dirDisplay.setDirections(res);
    });
  }

  changeDestPos(newPos: any) {
    this.toPos = newPos.coords;
    this.calcDirection();
  }

  selectShop(shop) {
    this.fromPos.lat = shop.lat;
    this.fromPos.lng = shop.lng;
    this.shops.map(
      (shopObj) => shopObj.opacity = 0.5
    );
    shop.opacity = 1;
    this.calcDirection();
  }

  refreshOrders() {
    this.cart = this.productsService.getCart();
    this.price = this.calcTotalPrice();
  }

  calcProductsPrice() {
    let price = 0;
    for (const product of this.cart) {
      price += product.price;
    }
    return +price.toFixed(2);
  }

  calcTotalPrice(): number {
    return +(this.calcProductsPrice() + this.deliveryInfo.price).toFixed(2);
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  addOrder() {
    const products: { name: string, price: number }[] = [];
    for (const product of this.cart) {
      products.push({
        name: product.name,
        price: product.price
      });
    }
    this.ordersService.addOrder(
      new Order(
        '0',
        '0',
        products,
        new Date(),
        0
      )
    );
    this.productsService.sendOrder(this.calcProductsPrice());
    this.successMsg = true;
  }
}

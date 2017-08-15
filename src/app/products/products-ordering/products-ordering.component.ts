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

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    this.iconUrl = 'assets/img/shop.png';
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
  toPos = {
    lat: this.gmap.lat,
    lng: this.gmap.lng
  };

  shops: Shop[] = [
    new Shop(48.698200, 26.575637),
    new Shop(48.689785, 26.579571),
    new Shop(48.681764, 26.589226),
  ];
  dirService: any;
  dirDisplay: any;

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

  gmapDir() {
    this.dirService = new google.maps.DirectionsService;
    this.dirDisplay = new google.maps.DirectionsRenderer({
      map: this.gmapObj
    });
    console.log(this.dirDisplay.setDirections);
  }

  mapReady(event) {
    this.gmapObj = event;
    this.gmapDir();
  }

  direction() {
    const dirDisplay = this.dirDisplay;

    this.dirService.route({
      origin: {
        lat: this.fromPos.lat,
        lng: this.fromPos.lng
      },
      destination: {
        lat: this.toPos.lat,
        lng: this.toPos.lng
      },
      travelMode: 'DRIVING'
    }, function (res, status) {
      dirDisplay.setDirections(res);
    });
  }

  selectShop(shop) {
    this.fromPos.lat = shop.lat;
    this.fromPos.lng = shop.lng;
  }

  setClientPos(newPos: any) {
    this.toPos = newPos.coords;
  }

  refreshOrders() {
    this.cart = this.productsService.getCart();
    this.price = this.calcTotalPrice();
  }

  calcTotalPrice() {
    let price = 0;
    for (const product of this.cart) {
      price += product.price;
    }
    return +price.toFixed(2);
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  calcDeliveryPrice(): number {
    return 100;
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
    this.productsService.sendOrder(this.calcDeliveryPrice());
    this.successMsg = true;
  }
}

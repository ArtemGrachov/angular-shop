import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { ProductsService } from '../products.service';
import { OrdersService } from '../../admin/orders.service';
import { UsersService } from '../../admin/users.service';
import { AuthService } from '../../auth/auth.service';

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
  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public gmapAPI: GoogleMapsAPIWrapper,
    public authService: AuthService,
    public usersService: UsersService,
    public fb: FormBuilder
  ) {
  }
  orderForm: FormGroup;

  cart;

  totalPrice = 0;
  successMsg: boolean = false;

  gmap = {
    lat: 48.698200,
    lng: 26.575637,
    zoom: 16
  };
  gmapObj: any;
  clientMarkerUrl: string = 'assets/img/client.png';

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
  ngOnInit() {
    this.cart = this.productsService.getCart();
    this.buildForm();
  }

  buildForm() {
    if (this.authService.checkAuth()) {
      this.orderForm = this.fb.group({
        'location': this.usersService.getCurrentUser().location,
        'shopLocation': { lat: this.shops[0].lat, lng: this.shops[0].lng },
        'phone': [this.usersService.getCurrentUser().phone, Validators.required],
        'type': 'DRIVING'
      });
    } else {
      this.orderForm = this.fb.group({
        'location': { lat: this.gmap.lat, lng: this.gmap.lng },
        'shopLocation': { lat: this.shops[0].lat, lng: this.shops[0].lng },
        'phone': ['', Validators.required],
        'type': 'DRIVING'
      });
    }
  }

  mapReady(event) {
    this.gmapObj = event;
    this.gmapDir();
    this.calcDirection();
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
      origin: this.orderForm.get('shopLocation').value,
      destination: this.orderForm.get('location').value,
      travelMode: this.orderForm.get('type').value
    }, function (res) {
      const dist = +(res.routes[0].legs[0].distance.value / 1000).toFixed(1),
        price = dist * 1,
        time = Math.round(res.routes[0].legs[0].duration.value / 60);

      _this.deliveryInfo.price = price;
      _this.deliveryInfo.distance = dist;
      _this.deliveryInfo.time = time;
      _this.deliveryInfo.display = true;

      _this.dirDisplay.setDirections(res);
      _this.totalPrice = _this.calcTotalPrice();
    });
  }

  changeDestPos(newPos) {
    this.orderForm.get('location').patchValue(newPos.coords);
    this.calcDirection();
  }

  selectShop(shop) {
    this.orderForm.get('shopLocation').patchValue({ lat: shop.lat, lng: shop.lng });
    this.shops.map(
      (shopObj) => shopObj.opacity = 0.5
    );
    shop.opacity = 1;
    this.calcDirection();
  }

  calcTotalPrice(): number {
    return +(this.cart.price + this.deliveryInfo.price).toFixed(2);
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  sendOrder() {
    const products: { name: string, price: number }[] = [];
    let cartList = this.cart.list;
    for (const product of this.cart.list) {
      if (product.count > 0) {
        products.push({
          name: product.name,
          price: product.price
        });
      }
    }
    this.ordersService.addOrder(
      new Order(
        '0',
        '0',
        products,
        new Date(),
        this.orderForm.get('location').value
      )
    ).subscribe(
      () => {
        this.successMsg = true;
        this.productsService.clearCartOrder();
      });
  }
}

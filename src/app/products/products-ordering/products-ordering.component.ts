import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../products.service';
import { OrdersService } from '../../admin/orders.service';
import { UsersService } from '../../admin/users.service';
import { ProvidersService } from '../../providers/providers.service';

import { Product } from '../../shared/models/product.model';
import { Order } from '../../shared/models/order.model';

import { Observable } from 'rxjs/Observable';

class Shop {
  public lat: number;
  public lng: number;
  public iconUrl: string;
  public opacity: number;
  public name: string;
  constructor(lat: number, lng: number, name: string) {
    this.lat = lat;
    this.lng = lng;
    this.iconUrl = 'assets/img/shop.png';
    this.opacity = 0.5;
    this.name = name;
  }
}

declare var google: any;

@Component({
  selector: 'app-products-ordering',
  templateUrl: './products-ordering.component.html'
})
export class ProductsOrderingComponent implements OnInit {
  constructor(
    public productsService: ProductsService,
    private ordersService: OrdersService,
    private gmapAPI: GoogleMapsAPIWrapper,
    private authService: AuthService,
    private usersService: UsersService,
    private providersServce: ProvidersService,
    private fb: FormBuilder
  ) {
  }
  public orderForm: FormGroup;

  public cart;

  public totalPrice = 0;
  public successMsg: boolean = false;

  public gmap = {
    location: {
      lat: 48.698200,
      lng: 26.575637
    },
    zoom: 13
  };
  public gmapObj: any;
  public clientMarkerUrl: string = 'assets/img/client.png';

  public shops: Shop[] = [
    new Shop(48.698200, 26.575637, 'Shop #1'),
    new Shop(48.689785, 26.579571, 'Shop #2'),
    new Shop(48.681764, 26.589226, 'Shop #3'),
  ];
  public dirService: any;
  public dirDisplay: any;
  public deliveryInfo = {
    price: 0,
    distance: 0,
    time: 0,
    display: false
  };

  public preloader: boolean = true;

  ngOnInit() {
    this.cart = this.productsService.getCart();
    this.authService.getAuth().subscribe(
      auth => this.cart = this.productsService.getCart()
    );
    this.buildForm();
  }

  buildForm() {
    this.preloader = false;
    const user = this.authService._currentUser;
    if (user) {
      this.orderForm = this.fb.group({
        'location': { lat: user.location.lat, lng: user.location.lng },
        'shopLocation': { lat: this.shops[0].lat, lng: this.shops[0].lng },
        'phone': [user.phone, Validators.required],
        'type': 'DRIVING'
      });
    } else {
      this.orderForm = this.fb.group({
        'location': { lat: this.gmap.location.lat, lng: this.gmap.location.lng },
        'shopLocation': { lat: this.shops[0].lat, lng: this.shops[0].lng },
        'phone': ['', Validators.required],
        'type': 'DRIVING'
      });
    }
  }

  mapReady(map) {
    this.gmapObj = map;
    this.gmapDir();
    this.authService.getAuth().subscribe(
      res => {
        if (res) {
          this.calcDirection();
        }
        this.setNearestShop();
      }
    );
  }

  gmapDir() {
    this.dirService = new google.maps.DirectionsService;
    this.dirDisplay = new google.maps.DirectionsRenderer({
      map: this.gmapObj,
      suppressMarkers: true,
      preserveViewport: true
    });
  }

  calcDirection() {
    const _this = this;
    _this.dirService.route({
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

  setNearestShop() {
    this.selectShop(this.shops.reduce(
      (nearest, current) => {
        const nearestDist =
          Math.sqrt(
            Math.pow(Math.abs(nearest.lat - this.orderForm.get('location').value.lat), 2)
            + Math.pow(Math.abs(nearest.lng - this.orderForm.get('location').value.lng), 2)
          );
        const currentDist =
          Math.sqrt(
            Math.pow(Math.abs(current.lat - this.orderForm.get('location').value.lat), 2)
            + Math.pow(Math.abs(current.lng - this.orderForm.get('location').value.lng), 2)
          );
        return nearestDist < currentDist ? nearest : current;
      }
    ));
  }

  calcTotalPrice(): number {
    return +(this.cart.price + this.deliveryInfo.price).toFixed(2);
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  sendOrder() {
    const products: { name: string, price: number, provider: string }[] = [];
    const cartList = this.cart.list;
    new Observable(
      observer => {
        for (let i = 0; i < this.cart.list.length; i++) {
          const product = this.cart.list[i];
          if (product.count > 0) {
            this.providersServce.loadProvider(product.providerId).subscribe(
              provider => {
                products.push({
                  name: product.name,
                  price: product.price,
                  provider: provider.name
                });
                if (i === this.cart.list.length - 1) {
                  observer.next();
                  observer.complete();
                }
              }
            );
          }
        }
      }
    ).subscribe(
      () => {
        this.ordersService.addOrder(
          new Order(
            '0',
            this.authService._currentUser ? this.authService._currentUser.id : null,
            products,
            this.deliveryInfo.price,
            new Date(),
            this.productsService.discount,
            this.orderForm.get('location').value
          )
        ).subscribe(
          () => {
            this.successMsg = true;
            this.productsService.clearCartOrder();
          });
      }
      );
  }
}

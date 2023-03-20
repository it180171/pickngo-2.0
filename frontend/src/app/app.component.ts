import {Component, OnInit} from '@angular/core';
import { Order } from './models/Order';
import { Product } from './models/Product';
import { OrderItem } from './models/OrderItem';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pickngo-angular';
  hide: boolean = true;
  order: Order = new Order();

  constructor(private http: HttpClient) {
  }

  hideShoppC() {
    this.hide = !this.hide;
  }

  // logout after 1 hour
  ngOnInit() {
    let timer: any = localStorage.getItem('user_auth_timer_start');
    if(timer !== null) {
      let expired = timer - Date.now();
      if(expired <= 0) {
        localStorage.getItem('user_auth')
        localStorage.removeItem('user_auth_timer_start');
      }
    }
  }


  addProduct(products: Product[]): void {
    for (let p of products) {
      let oi = new OrderItem();
      oi.orderItemId.product = p;
      this.order.orderItems.push(oi);
    }
    console.log(this.order);
  }
}
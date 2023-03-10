import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from 'src/app/models/Menu';
import { Order } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { OrderItemID } from 'src/app/models/OrderItemID';
import { OrderDataService } from 'src/app/services/order-data.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent implements OnInit {
  @Input() menu: Menu;
  @Input() name: String;
  title: String = '';
  order: Order;
  bestellt: boolean = false;

  constructor(private orderData: OrderDataService) { }

  ngOnInit(): void {
    const p = this.menu.products;
    this.menu.price = 0;

    for (let p of this.menu.products) {
      this.menu.price += p.price;
      p.imageName = environment.apiUrl + '/product/img/' + p.imageName;
    }

    for (let i = 0; i < p.length - 2; i++) {
      this.title += p[i].name + ', ';
    }
    this.title += p[p.length - 2].name + ' und ' + p[p.length - 1].name + '';

    this.orderData.currentOrder.subscribe(order => this.order = order);
  }

  onClick() {
    for (let p of this.menu.products) {

      let yo = this.order.orderItems.find(oi2 => oi2.orderItemId.product.id === p.id);
      if (yo) {
        yo.quantity++;
      } else {
        let oi = new OrderItem();
        let oiId = new OrderItemID();
        oiId.product = p;
        oi.orderItemId = oiId;
        this.order.orderItems.push(oi);
      }
    }

    this.orderData.changeOrder(this.order);

    this.bestellt = true;
    setTimeout(() => {
      this.bestellt = false;
    }, 7000);
  }
}

import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { ApiService } from 'src/app/services/api.service';
import { OrderDataService } from 'src/app/services/order-data.service';
import { ProductService } from 'src/app/services/product.service';
import * as twilio from "twilio";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;
  orderCopy: Order;
  ordered = false;
  form: UntypedFormGroup;
  logedIn: boolean = false;
  user: any;
  bestellt: boolean = false;
  sum: number = 0;


  constructor(private orderData: OrderDataService, private fb: UntypedFormBuilder, private productService: ProductService, private ls: ApiService) {
    this.form = this.fb.group({
      tele: [null, Validators.required, Validators.minLength(7), Validators.maxLength(20)]
    });
  }

/*accountSid = 'AC218c13853e6d8dbcbe22ac0eb73f7a7d';
  authToken = '760e4f3e60907694dab36adaca55264f';
  client = twilio(this.accountSid, this.authToken);
   // SMS
  sendSms() {
    this.client.messages
        .create({
          to: '+4367761174680',
          from: '+15617822658',
          body: 'hallooo',
        })
        .then((message: { sid: any; }) => console.log(message.sid));
  }
  */

  ngOnInit(): void {
    this.bestellt = false;
    this.orderData.currentOrder.subscribe(o => {
      this.order = o;
      this.sum = 0;
      for (let oi of o.orderItems) {
        this.sum += oi.orderItemId.product.price * oi.quantity;
      }
    });
    this.orderCopy = this.order;
    console.log(this.order);
    // this.order = new Order();
    console.log(this.orderCopy);
    this.ls.user?.subscribe(u => { this.logedIn = (u != null && u.id >= 0); console.log(u); this.user = u; })
    console.log(this.ordered)
  }

  deleteOrderItem(orderItem: OrderItem): void {
    this.order.orderItems.splice(this.order.orderItems.findIndex(oi => oi.orderItemId.product.id === orderItem.orderItemId.product.id), 1);
    this.orderData.changeOrder(this.order);
  }

  onSubmit() {
    if (this.order.orderItems.length > 0) {
      let u = this.user;

      if (u != null && u.id != null) {
        console.log('yo');
        this.order.customer = u;
      }

      console.log(this.order);

      let p = this.order.planedToPickTime;
      this.order.planedToPickTime = new Date(`${p.getDate()}-${p.getMonth() + 1}-${p.getFullYear()}T${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}`);
      this.productService.order(this.order).subscribe(o => { console.log(o); });

      this.orderData.changeOrder(new Order());

      this.bestellt = true;
      this.ordered = true;
      /*this.sendSms();*/
    }
  }

  change(orderItem: OrderItem): void {
    this.order.orderItems[this.order.orderItems.findIndex(oi => oi.orderItemId.product.id === orderItem.orderItemId.product.id)] = orderItem;
    this.orderData.changeOrder(this.order);
  }
}

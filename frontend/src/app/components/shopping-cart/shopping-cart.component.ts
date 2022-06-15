import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @Input() hide: boolean = true;
  hideInput: boolean = true;
  order: Order;
  @Output() closeShoppC = new EventEmitter();
  faClose = faXmark;
  sum: number = 0;

  constructor(private orderData: OrderDataService) { }

  ngOnInit(): void {
    this.orderData.currentOrder.subscribe(o => {
      this.order = o;
      this.sum = 0;
      for (let oi of o.orderItems) {
        this.sum += oi.orderItemId.product.price * oi.quantity;
      }
    });
  }

  onClose(): void {
    this.closeShoppC.emit();
  }

  deleteOrderItem(orderItem: OrderItem): void {
    this.order.orderItems.splice(this.order.orderItems.findIndex(oi => oi.orderItemId.product.id === orderItem.orderItemId.product.id), 1);
    console.log(this.order);
    this.orderData.changeOrder(this.order);
  }

  change(orderItem: OrderItem): void {
    this.order.orderItems[this.order.orderItems.findIndex(oi => oi.orderItemId.product.id === orderItem.orderItemId.product.id)] = orderItem;
    console.log(this.order);
    this.orderData.changeOrder(this.order);
  }
}

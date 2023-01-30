import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models/OrderItem';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() orderItem: OrderItem;

  public apiUrl: String = environment.apiUrl;

  
  constructor() { }

  ngOnInit(): void {
  }

}

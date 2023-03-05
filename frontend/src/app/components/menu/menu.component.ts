import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { faShoppingCart, faUser, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';
import { OrderDataService } from 'src/app/services/order-data.service';
import { AuthService } from 'src/app/services/auth.service';
import {of} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() onHideShoppC = new EventEmitter();
  @Input() text: String;
  shoppingCartIcon = faShoppingCart;
  klimaBoxIcon = faPiggyBank;
  userIcon = faUser;
  isOnLoginPage = false;
  shoppingCartItemCounter: number = 99;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private orderData: OrderDataService, private authService: AuthService) {
    this.router.events.subscribe(e => {
      this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
      this.isOnLoginPage = !(this.router.url.includes('register') || this.router.url.includes('login'));
    })
  }

  ngOnInit(): void {
    console.log(this.isLoggedIn);
    this.orderData.currentOrder.subscribe(o => {
      this.shoppingCartItemCounter = o.orderItems.length;
    });
  }


  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }

  onClickShoppingCart() {
    this.onHideShoppC.emit();
  }

}

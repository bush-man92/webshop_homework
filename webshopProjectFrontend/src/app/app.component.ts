import { Component, OnInit } from '@angular/core'
import { UserService } from './auth/user-service'
import { Router } from '@angular/router';

@Component({
  selector: 'pm-root',
  template: `
  <cart *ngIf="show_cart"></cart>
  <nav class= 'navbar navbar-expand navbar-light bg-light'>
    <a class= 'navbar-brand'>{{pageTitle}}</a>
    <ul class= 'nav nav-pills'>
      <li><a *ngIf="!show_logout" (click)=onLoginClick() class= 'nav-link' [routerLink]= "['/login']">Login</a>
      <li><a *ngIf="show_logout" (click)=onLogoutClick() class= 'nav-link' [routerLink]="['/login']">Logout</a>
      <li><a class= 'nav-link' [routerLink]= "['/register']">Register</a></li>
      <li><a class= 'nav-link' [routerLink]= "['/products']">Product List</a></li>
      <li><button class= "btn btn-primary" (click)=toggleCart()>Shopping Cart</button></li>
    </ul>
  </nav>
  <div class= 'container'>
    <router-outlet></router-outlet>
  </div>`,
})

export class AppComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
  }
  show_logout: boolean = false;
  pageTitle: string = 'WebShop';
  show_cart: boolean = false;
  user; 

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.user = user);
    this.check_user()
  }

  onLogoutClick() {
    this.userService.logUser('unknown user')
    localStorage.removeItem('user_id')
    localStorage.removeItem('username')
    this.check_user()
  }

  check_user() {
    if (localStorage.getItem('user_id') === null) {
      this.show_logout = false;
    }
    else {
      this.show_logout = true;
    }
  }

  onLoginClick() {
    this.check_user()
  }

  toggleCart() {
    if (this.show_cart === false) {
      this.show_cart = true
    }
    else {
      this.show_cart = false
    }
  }
}
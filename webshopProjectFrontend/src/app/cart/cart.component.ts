import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { CART_QUERY } from '../graphql';
import { CART_MUTATION } from '../graphql';
import { UserService } from '../auth/user-service';

@Component({
  templateUrl: './cart.component.html',
  selector: 'cart'
})
export class CartComponent implements OnInit {
  constructor (private apollo: Apollo, private userService: UserService) {
  }
  public pageTitle = 'SHOPPING CART';
  username: String = "You are not logged in";
  user;
  cart;

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.user = user)
    this.getCart()
  }

  removeFromCart(itemId) {
    this.apollo.mutate({
        mutation: CART_MUTATION,
        variables: {
            userId: localStorage.getItem('user_id'),
            itemId: itemId,
            modifier: "-"
        }
    }).subscribe(({ data }) => {
        console.log(data)
    },(error) => {
        console.log(error)
    });
  }

  getCart() {
    if (localStorage.getItem('username') !== null) {
        this.username = localStorage.getItem('username')
        this.apollo.watchQuery({
            query: CART_QUERY,
            variables: {
                userId: localStorage.getItem('user_id')
            },
            pollInterval: 300
        }).valueChanges.subscribe((response) => {
            this.cart = response.data.cart;
        });
    }
    else {
    }
  }
}
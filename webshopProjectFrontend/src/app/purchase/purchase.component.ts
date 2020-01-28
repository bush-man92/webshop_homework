import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  templateUrl: './purchase.component.html'
})
export class PurchaseComponent {
  constructor (private apollo: Apollo, private router: Router) {
  }

  public pageTitle = 'PURCHASE';
  paying: String;
  address: String;
  show_credit_card: boolean = false;

  onClick(){
    if (this.paying = "Credit Card") {
      this.show_credit_card = true;
    }
    else {
      this.show_credit_card = false;
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

import { IProduct } from '../product';
import { ITEM_QUERY } from '../../graphql'

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.apollo.watchQuery({
      query: ITEM_QUERY,
      variables: {
        id: id,
      },
      }).valueChanges.subscribe((response) => {
        this.product = response.data.item;
  });
}

  onBack(): void {
    this.router.navigate(['/products']);
  }
}

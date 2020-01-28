import { Component, OnInit } from '@angular/core'
import { Apollo } from 'apollo-angular';

import { IProduct } from './product';
import { UserService } from "../auth/user-service";
import { ALL_ITEMS_QUERY } from '../graphql'
import { CART_MUTATION } from '../graphql'

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string = '';
    loading: boolean = true;
    user;

    _listFilter: string;
    get listFilter(): string{
        return this._listFilter
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.allProducts;
    }

    filteredProducts: IProduct[];
    allProducts: IProduct[] = [];

    constructor(private apollo: Apollo, private userService: UserService) {
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.allProducts.filter((product: IProduct) => product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    addToCart(itemId) {
        this.apollo.mutate({
            mutation: CART_MUTATION,
            variables: {
                userId: localStorage.getItem('user_id'),
                itemId: itemId,
                modifier: "+"
            }
        }).subscribe(({ data }) => {
            console.log(data)
        },(error) => {
            console.log(error)
        });
    }

    ngOnInit() {
        this.userService.currentUser.subscribe(user => this.user = user)
        this.apollo.watchQuery({
            query: ALL_ITEMS_QUERY
        }).valueChanges.subscribe((response) => {
            this.allProducts = response.data.items;
            this.filteredProducts = this.allProducts;
        });
    }
}
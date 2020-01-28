import { IProduct } from './products/product';
import gql from 'graphql-tag'

export const ALL_ITEMS_QUERY = gql`
  query allItems {
    items {
      id
      name
      price
      photo
      about
    }
  }
`;

export const ITEM_QUERY = gql`
  query item ($id: Int!) {
    item (id: $id) {
      name
      price
      about
      photo
    }
  }
`
export const LOGIN_MUTATION = gql`
  mutation login ($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      user {
        id
        username
      }
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation registration ($username: String!, $password: String!, $email: String!) {
    registration (username: $username, password: $password, email: $email) {
      user {
        id
        username
      }
    }
  }
`

export const CART_QUERY = gql`
  query cart ($userId: Int!) {
    cart (userId: $userId) {
      quantity
      item {
        id
        name
        price
      }
    }
  }
`

export const CART_MUTATION = gql`
  mutation addToCart ($userId: Int!, $itemId: Int!, $modifier: String!) {
    addToCart (userId: $userId, itemId: $itemId, modifier: $modifier) {
      cart {
        id
      }
    }
  }
`

export interface AllItemsQueryResponse {
  allItems: IProduct[];
  loading: boolean;
}
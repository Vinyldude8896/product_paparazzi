import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_CANDID = gql`
  mutation addCandid($image: String!, $productName: String!, $retailer: String!, $username: String!) {
    addCandid(image: $image, productName: $productName, retailer: $retailer, username: $username) {
      _id
      image
      productName
      retailer
      createdAt
    }
  }
`;

export const REMOVE_CANDID = gql`
  mutation RemoveCandid($candidId: ID!) {
    removeCandid(candidId: $candidId) {
      ok
    }
  }
`;


export const UPDATE_CANDID = gql`
mutation UpdateCandid($candidId: ID!, $newProductName: String!, $newRetailer: String!) {
  updateCandid(candidId: $candidId, newProductName: $newProductName, newRetailer: $newRetailer) {
    ok
  }
}
`

export const ADD_COUPON = gql `
mutation addCoupon($couponText: String!, $redeemCounter: String!) {
 addCoupon(couponText: $couponText, redeemCounter: $redeemCounter){
  _id
  couponText
  redeemCounter
 }
}`

export const UPLOAD_FILE = gql`
    mutation FileUpload($file: Upload!, $retailer: String!, $product: String!) {
        fileUpload(file: $file, retailer: $retailer, product: $product) {
            filename
            mimetype
            encoding
        }
    }
`;



export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity

      }
    }
  }
`;

export const CHECKOUT = gql`
mutation checkout($products: [ID]!) {
  checkout(products: $products) {
    session
  }
}`
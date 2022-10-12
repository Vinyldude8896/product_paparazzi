import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      candidCount
      candids {
        _id
        image
        productName
        retailer
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      candidCount
      candids {
        _id
        image
        productName
        retailer
        createdAt
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      candidCount
      candids {
        _id
        image
      }
    }
  }
`;

export const QUERY_MY_CANDIDS = gql`
query GetMyCandids($username: String!) {
  myCandids(username: $username) {
    _id
    image
    productName
    retailer
    createdAt
    username
  }
}`

export const QUERY_ALL_CANDIDS = gql`
query GetAllCandids {
  allCandids {
    _id
    image
    productName
    retailer
    createdAt
    username
  }
}`

export const QUERY_CANDID = gql`
query candid($id: ID!) {
  candid(_id: $id) {
    _id
    image
    productName
    retailer
    createdAt
    username
  }
}`
export const QUERY_CHECKOUT = gql`
	query getCheckout($products: [ID]!) {
		checkout(products: $products) {
			session
		}
	}
`;


export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
    }
  }
`;

export const QUERY_COUPONS = gql`
query coupons($username: String!) {
	coupons(username: $username) {
		_id
		couponText
		redeemCounter
		username
	}
}`
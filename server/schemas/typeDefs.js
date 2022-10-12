const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
    candidCount: Int
    candids: [Candid]
    coupons: [Coupon]
  }
  type Auth {
    token: ID!
    user: User
  }

  scalar Upload
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
}
  type Retailer {
    _id: ID!
    name: String!
    image: String!
  }

  type Candid {
    _id: ID!
    image: String!
    productName: String!
    retailer: ID!
    username: String!
    createdAt: String!
  }

  type Coupon {
    _id: ID!
    couponText: String!
    redeemCounter: String!
    username: String!
  }

  type DeleteResponse {
    ok: Boolean!
  }
  
  type UpdateResponse {
    ok: Boolean!
  }
  
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    product(_id: ID!): Product
    products: [Product]
    retailers: [Retailer]
    candid(_id: ID!): Candid
    myCandids(username: String!): [Candid]
    allCandids: [Candid]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    coupons(username: String!): [Coupon]
  }

  type Mutation {
    fileUpload(file: Upload!, retailer: String!, product: String!): File!
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addFriend(friendId: ID!): User
    removeCandid(candidId: ID!): DeleteResponse
    updateCandid(candidId: ID!, newProductName: String!, newRetailer: String!): UpdateResponse
    addCandid(
      productName: String!
      image: String!
      retailer: String!
      username: String!
    ): Candid
    checkout(products: [ID]!): Checkout
    addCoupon(couponText: String!, redeemCounter: String!, username: String!) : Coupon
  }
`;

module.exports = typeDefs;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
  }
  type Auth {
    token: ID!
    user: User
  }

  type Retailer {
    _id: ID!
    name: String!
    image: String!
  }

  type Candid {
    _id: ID!
    productName: String!
    image: String!
    retailer: ID!
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
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addFriend(friendId: ID!): User
    addCandid(
      productName: String!
      image: String!
      retailerId: ID!
      userId: ID!
    ): Candid
    checkout(products: [ID]!): Checkout
  }
`;

module.exports = typeDefs;

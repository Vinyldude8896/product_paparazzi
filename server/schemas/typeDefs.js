const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
    candidCount: Int
    candids: [Candid]
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
    candids(username: String!): [Candid]
  }

  type Mutation {
    fileUpload(file: Upload!, retailer: String!, product: String!): File!
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

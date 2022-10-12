const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
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
  
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    retailers: [Retailer]
    candids(username: String!): [Candid]
    coupons(username: String!): [Coupon]
  }
  type Mutation {
    fileUpload(file: Upload!, retailer: String!, product: String!): File!
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addCandid(image: String!, productName: String!, retailer: String!, username: String!): Candid
    addCoupon(couponText: String!, redeemCounter: String!, username: String!) : Coupon
  }
`;

module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    friends: [User]
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
  
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    retailers: [Retailer]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addCandid(productName: String!, image: String!, retailerId: ID!, userId: ID!): Candid
  }
`;

module.exports = typeDefs;

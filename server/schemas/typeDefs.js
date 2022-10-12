const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
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

  type DeleteResponse {
    ok: Boolean!
  }
  
  type UpdateResponse {
    ok: Boolean!
  }
  
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    retailers: [Retailer]
    candid(_id: ID!): Candid
    myCandids(username: String!): [Candid]
    allCandids: [Candid]
  }

  type Mutation {
    fileUpload(file: Upload!, retailer: String!, product: String!): File!
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addCandid(image: String!, productName: String!, retailer: String!, username: String!): Candid
    removeCandid(candidId: ID!): DeleteResponse
    updateCandid(candidId: ID!, newProductName: String!, newRetailer: String!): UpdateResponse
  }
`;

module.exports = typeDefs;
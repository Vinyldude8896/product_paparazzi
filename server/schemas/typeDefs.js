// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    PhotoCount: Int
    Photos: [Photo]
  }

  type Photo {
    _id: ID
    Location: String
    Product: String
    Image: String
    createdAt: String
  }
  type Query {
    users: [User]
    user(username: String!): User
    Photos(username: String): [Photo]
    Photo(_id: ID!): Photo
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
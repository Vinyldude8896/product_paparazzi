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
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    photos(username: String): [Photo]
    photo(_id: ID!): Photo
  }
  

  type Photo {
    _id: ID
    location: String
    product: String
    image: String
    createdAt: String
  }
  type Query {
    users: [User]
    user(username: String!): User
    Photos(username: String): [Photo]
    Photo(_id: ID!): Photo
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPhoto(location: String!, product: String!, image: String!, createdAt: String!): Photo
  }
`;

// export the typeDefs
module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    books: [Book]
  }

  type Book {
    title: String
    authors: [String]
    description: String
  }

  type Query {
    getUser: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = { typeDefs };

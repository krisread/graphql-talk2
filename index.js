const express = require('express')
const {  ApolloServer, gql } = require('apollo-server-express')
const { authors } = require('./lib/data')

// The GraphQL schema in string form
const typeDefs = gql`

  type Query { 
    authors: [Author]
    author(id: Int): Author
  }
  
  type Author {
    name: String!
  }

`

// The resolvers
const resolvers = {

  Query: {

    authors: () => {
      return Object.values(authors)
    },

    author: (root, { id }) => {
      return authors[id]
    }
  },

}

// Initialize the app
const app = express()

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

// Start the server
app.listen(3001, () => {
  console.log(`Go to http://localhost:3001${server.graphqlPath} to run queries!`)
})
import { readFileSync } from 'fs'
import { ApolloServer, gql } from 'apollo-server'
import pool from './Pool'
import { config } from 'dotenv'
import { resolvers } from './resolvers/index'

config()

pool.connect({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: process.env.PG_PASSWORD,
})

const typeDefs = gql`
  ${readFileSync(__dirname.concat('/schema.graphql'))}
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})

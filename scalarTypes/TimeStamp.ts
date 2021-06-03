import { GraphQLScalarType, Kind } from 'graphql'

export const Timestamp = new GraphQLScalarType({
  name: 'Timestamp',
  serialize(date) {
    return date instanceof Date ? date.getTime() : null
  },
  parseValue(date) {
    try {
      return new Date(date)
    } catch (error) {
      return null
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    } else if (ast.kind === Kind.STRING) {
      return this.parseValue(ast.value)
    } else {
      return null
    }
  },
})

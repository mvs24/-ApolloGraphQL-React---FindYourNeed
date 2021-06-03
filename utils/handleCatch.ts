import { ApolloError } from 'apollo-server'

export const handleCatch = (error: any) => {
  if (error.isOperational) {
    throw error
  }
  throw new ApolloError('Something went wrong!')
}

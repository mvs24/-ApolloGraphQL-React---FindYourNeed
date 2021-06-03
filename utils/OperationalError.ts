import { ApolloError } from 'apollo-server-errors'

export class OperationalError extends ApolloError {
  public isOperational
  constructor(message: string) {
    try {
      super(message)
      this.isOperational = true
    } catch (err) {
      console.log(err)
    }
  }
}

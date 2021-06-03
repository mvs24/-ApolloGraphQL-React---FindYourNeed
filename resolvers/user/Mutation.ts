import { AuthenticationPayload } from './types'
import { ApolloError } from 'apollo-server'

export default {
  signup(_: null, args: AuthenticationPayload) {
    const {
      name,
      lastname,
      email,
      password,
      passwordConfirm,
      role,
      speciality,
    } = args

    if (!name) {
      throw new ApolloError('Name must be defined')
    }

    return {
      name: '1',
    }
  },
}

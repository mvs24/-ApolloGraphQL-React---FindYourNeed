import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String
    $lastname: String
    $email: String
    $password: String
    $passwordConfirm: String
  ) {
    signup(
      authenticationPayload: {
        lastname: $lastname
        name: $name
        password: $password
        passwordConfirm: $passwordConfirm
        email: $email
      }
    ) {
      user {
        id
        name
        lastname
        password
        role
        speciality
        passwordConfirm
      }
      token
    }
  }
`

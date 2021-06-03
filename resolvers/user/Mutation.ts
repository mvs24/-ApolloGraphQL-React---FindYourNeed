import { AuthenticationPayload } from './types'
import { sign, verify } from 'jsonwebtoken'
import { hash } from 'bcryptjs'
import pool from '../../Pool'
import { OperationalError } from '../../utils/OperationalError'
import { handleCatch } from '../../utils/handleCatch'
import { ApolloError } from 'apollo-server-errors'

const handleEmailValidation = (email: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (!email.match(emailRegex)) {
    throw new OperationalError('Your email is invalid')
  }
}

const validateAuthenticationPayload = (
  authenticationPayload: AuthenticationPayload
) => {
  const { name, lastname, email, password, passwordConfirm } =
    authenticationPayload
  if (!name || !lastname || !email || !password || !passwordConfirm) {
    throw new OperationalError('Please specify all required inputs!')
  }

  if (password.length < 6 || passwordConfirm.length < 6) {
    throw new OperationalError(
      'Password and Password Confirm must be greater than 6 characters'
    )
  }

  handleEmailValidation(email)
}

const handlePasswordEncryption: (password: string) => Promise<string> = async (
  password
) => {
  return await hash(password, 12)
}

const signJWT = (userPayload: {}) => {}

export default {
  async signup(
    _: null,
    args: { authenticationPayload: AuthenticationPayload }
  ) {
    const {
      name,
      lastname,
      email,
      password,
      passwordConfirm,
      role,
      speciality,
    } = args.authenticationPayload

    validateAuthenticationPayload({
      name,
      lastname,
      email,
      password,
      passwordConfirm,
    })

    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      )
      if (rows.length > 0) {
        throw new OperationalError('User with this email exists!')
      }

      const hashedPassword = await handlePasswordEncryption(password!)

      const insertResponse = await pool.query(
        `INSERT INTO users(name, lastname, email, password, passwordConfirm, role, speciality) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          name,
          lastname,
          email,
          hashedPassword,
          hashedPassword,
          role || 'user',
          speciality,
        ]
      )

      return insertResponse.rows[0]
    } catch (error) {
      console.log(error)
      handleCatch(error)
    }
  },
}

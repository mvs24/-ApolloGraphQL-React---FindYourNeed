import React, { Fragment, useState } from 'react'
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { regex } from '../constants/regex'
import { Button } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import { gql, useMutation } from '@apollo/client'
import { SIGNUP_MUTATION } from '../graphql/mutations'

interface Props {}

interface InputState {
  value: string
  icon: string
  touched: boolean
  required: boolean
  minLength?: number
  isEmail?: boolean
  error: { state: boolean; message: string }
}

type SignupState = {
  identifier: identifier
  state: InputState
}[]

type identifier = 'Name' | 'Lastname' | 'Email' | 'Password' | 'PasswordConfirm'

const Signup: React.FC<Props> = () => {
  const [signupState, setSignupState] = useState<SignupState>([
    {
      identifier: 'Name',
      state: {
        value: '',
        icon: 'user',
        touched: false,
        required: true,
        error: { state: false, message: 'Name is required' },
      },
    },
    {
      identifier: 'Lastname',
      state: {
        value: '',
        icon: 'user',
        touched: false,
        required: true,
        error: { state: false, message: 'Lastname is required' },
      },
    },
    {
      identifier: 'Email',
      state: {
        value: '',
        icon: 'email-edit-outline',
        touched: false,
        required: true,
        isEmail: true,
        error: { state: false, message: 'Email is invalid' },
      },
    },
    {
      identifier: 'Password',
      state: {
        value: '',
        icon: 'form-textbox-password',
        touched: false,
        required: true,
        minLength: 6,

        error: {
          state: false,
          message: 'Password must be at least 6 characters',
        },
      },
    },
    {
      identifier: 'PasswordConfirm',
      state: {
        value: '',
        icon: 'form-textbox-password',
        touched: false,
        required: true,
        minLength: 6,
        error: {
          state: false,
          message: 'PasswordConfirm must be at least 6 characters',
        },
      },
    },
  ])
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [signupMutation] = useMutation(SIGNUP_MUTATION)

  const signupHandler = async function () {
    const [
      nameState,
      lastNameState,
      emailState,
      passwordState,
      passwordConfirmState,
    ] = signupState
    const res = await signupMutation({
      variables: {
        name: nameState.state.value,
        lastname: lastNameState.state.value,
        email: emailState.state.value,
        password: passwordState.state.value,
        passwordConfirm: passwordConfirmState.state.value,
      },
    })

    console.log(res)
  }

  const isInputValid = function (input: InputState, text: string): boolean {
    let isInputValid = true

    if (input.required) {
      isInputValid = isInputValid && text.length > 0
    }
    if (input.isEmail) {
      isInputValid = isInputValid && regex.email.test(text)
    }
    if (input.minLength) {
      isInputValid = isInputValid && text.length >= input.minLength
    }

    return isInputValid
  }

  const isOverallFormValid = function (
    updatedSignUpState: SignupState
  ): boolean {
    return updatedSignUpState.every((el) => el.state.error.state === true)
  }

  const inputChangeHandler = function (
    text: string,
    identifier: identifier
  ): void {
    const updatedSignUpState = [...signupState]
    const currentInput = updatedSignUpState.find(
      (el) => el.identifier === identifier
    )!
    currentInput.state.value = text
    currentInput.state.touched = true
    currentInput.state.error = {
      ...currentInput.state.error,
      state: isInputValid(currentInput.state, text),
    }

    setIsFormValid(isOverallFormValid(updatedSignUpState))
    setSignupState(updatedSignUpState)
  }

  return (
    <Fragment>
      {signupState.map((el) => (
        <Input
          secureTextEntry={
            el.identifier === 'Password' || el.identifier === 'PasswordConfirm'
          }
          value={el.state.value}
          errorStyle={{ color: 'red' }}
          errorMessage={
            el.state.error.state === false && el.state.touched === true
              ? el.state.error.message
              : ''
          }
          onChangeText={(text) => inputChangeHandler(text, el.identifier)}
          placeholder={el.identifier}
          leftIcon={
            el.state.icon === 'user' ? (
              <AntDesign name={el.state.icon} size={24} color="black" />
            ) : (
              <MaterialCommunityIcons
                // @ts-ignore
                name={el.state.icon}
                size={24}
                color="black"
              />
            )
          }
        />
      ))}
      <View style={styles.button}>
        <Button
          onPress={signupHandler}
          icon={
            <MaterialCommunityIcons
              name={'arrow-right'}
              size={15}
              color={Colors.rebeccapurple.text}
            />
          }
          type="outline"
          title="Submit"
          disabled={isFormValid === false}
        />
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    textAlign: 'center',
  },
})

export default Signup

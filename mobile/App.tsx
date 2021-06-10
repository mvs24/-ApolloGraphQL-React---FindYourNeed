import 'react-native-gesture-handler'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Signup from './screens/Signup'
import { StatusBar } from 'react-native'
import Layout from './Layout'
import { ApolloProvider } from '@apollo/client'
import { AppRegistry } from 'react-native'
import { apolloClient } from './apolloClient'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <Layout />
        <Signup />
        <StatusBar />
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

AppRegistry.registerComponent('MyApplication', () => App)

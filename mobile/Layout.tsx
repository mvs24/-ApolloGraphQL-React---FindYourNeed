import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import Colors from './constants/Colors'

const Layout: React.FC<{}> = () => {
  return <Text style={styles.text}>Find Your Need</Text>
}

const styles = StyleSheet.create({
  text: {
    color: Colors.rebeccapurple.text,
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
  },
})

export default Layout

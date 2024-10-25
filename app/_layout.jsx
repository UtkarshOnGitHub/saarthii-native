import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '../Context/AuthContext'

const _layout = () => {
  return (
    <AuthProvider>
      <Stack 
          screenOptions={{
              headerShown:false
          }}
      ></Stack>
    </AuthProvider>
  )
}

export default _layout
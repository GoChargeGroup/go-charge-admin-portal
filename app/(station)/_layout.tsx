import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  
  return (
    <Stack>
      <Stack.Screen name="approve-stations" options={{ headerShown: false}} />
      <Stack.Screen name="main" options={{ headerShown: false}} />
    </Stack>
  )
}

export default AuthLayout
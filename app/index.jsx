import React from 'react'
import { Button, Text, View } from 'react-native';
import ScreenWrapper from "../constants/ScreenWrapper"
import {router} from "expo-router"

const index = () => {

  return (
    <ScreenWrapper>
        <Text>Welcome</Text>
        <Button onPress={()=>{router.push('welcomeScreen')}} title='Welcome'/>
    </ScreenWrapper>
  )
}

export default index

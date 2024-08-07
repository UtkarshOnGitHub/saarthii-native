import React, { useEffect } from 'react'
import { Button, Text, View } from 'react-native';
import ScreenWrapper from "../constants/ScreenWrapper"
import {router} from "expo-router"
import {WelcomeScreen} from "./welcomeScreen"
import Toast from 'react-native-toast-message';



const index = () => {

  return (
      <ScreenWrapper isPaddingRequired={false}>
          <WelcomeScreen/>
      </ScreenWrapper>
  )
}

export default index

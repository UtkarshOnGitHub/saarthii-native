import React, { useEffect } from 'react'
import { Button, Text, View } from 'react-native';
import ScreenWrapper from "../constants/ScreenWrapper"
import {router} from "expo-router"
import {WelcomeScreen} from "./welcomeScreen"

const index = () => {


  return (
    <ScreenWrapper isPaddingRequired={false}>
        <WelcomeScreen/>
    </ScreenWrapper>
  )
}

export default index

import React, { useEffect } from 'react'
import { Button, Text, View } from 'react-native';
import ScreenWrapper from "../constants/ScreenWrapper"
import {router} from "expo-router"
import {WelcomeScreen} from "./welcomeScreen"
import { TamaguiProvider, createTamagui } from '@tamagui/core'
import FontLoader from "../components/FontLoader"
import { config } from '@tamagui/config/v3';
import Toast from 'react-native-toast-message';

const tamaguiConfig = createTamagui(config)


const index = () => {

  return (
  // <FontLoader>
    <TamaguiProvider config={tamaguiConfig}>
      <ScreenWrapper isPaddingRequired={false}>
          <WelcomeScreen/>
          <Toast ref={(ref) => Toast.setRef(ref)} />
      </ScreenWrapper>
    </TamaguiProvider>
  // </FontLoader>
  )
}

export default index

import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import ScreenWrapper from "../constants/ScreenWrapper";
import { useRouter } from 'expo-router';
import { WelcomeScreen } from "./welcomeScreen";
import { useAuth } from '../Context/AuthContext';


const Index = () => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(typeof token == 'object'){
      return;
    }else{
      router.push("/(tabs)");
    }
  }, [token, router]);

  return (
    <ScreenWrapper isPaddingRequired={false}>
      <WelcomeScreen />
    </ScreenWrapper>
  );
};

export default Index;

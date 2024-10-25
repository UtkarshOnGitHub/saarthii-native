import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from "../constants/ScreenWrapper";
import { WelcomeScreen } from "./welcomeScreen";
import { useAuth } from '../Context/AuthContext';

const Index = () => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof token === 'string' && token.trim() !== '') {
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

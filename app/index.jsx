import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from "../constants/ScreenWrapper";
import { WelcomeScreen } from "./welcomeScreen";
import { useAuth } from '../Context/AuthContext';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

const Index = () => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && token && token.trim() !== '') {
      router.replace("/(tabs)");
    }
  }, [token, loading, router]);

  if (loading) {
    return (
      <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}>
      <Text>Logging You In...</Text>
    </AnimatedLoader>
    ) 
  }

  if (!token) {
    return (
      <ScreenWrapper isPaddingRequired={false}>
        <WelcomeScreen />
      </ScreenWrapper>
    );
  }

  return null;
};
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});

export default Index;

import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// Function to load fonts
const loadFonts = () => {
  return Font.loadAsync({
    'Inter': require('../assets/fonts/Inter.ttf'), // Adjust the path as needed
  });
};

const FontLoader = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts', error);
      }
    }

    load();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return children;
};

export default FontLoader;

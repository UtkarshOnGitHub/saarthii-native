import React , { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import ScreenWrapper from '../constants/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/CustomButton';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import SignupButtons from '../components/SignUpButtons';
import { SignInFromAxios } from '../http/SignIn';
import { router } from 'expo-router';
import { YStack } from 'tamagui';
import Toast from 'react-native-toast-message';
import { ServerURL } from '../Server/Service';




const Signup = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleInputChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignIn = () => {
    setIsLoading(true)
    SignInFromAxios({ email, password })
      .then((res) => {
        setIsLoading(false)
        console.log(res)
        if (res.data.redirect) {
          router.push('/(tabs)');
        }else{
          Toast.show({
            type: 'error',
            text1: 'Ooopss',
            text2: 'Something Went Wrong!',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Ooopss',
          text2: 'Something Went Wrong!',
        });
      });
  };

  function handleGoogleAuth(){
    // window.location.href = ServerURL + "api/authentication/google/";
    // return {success : true };
  }


  if(isLoading){
    return(
      <View style={[styles.containerLOader, styles.horizontalLoad]}>
        <ActivityIndicator size="28" color="#fff" />
      </View>
    )
  }



  return (
    <ScreenWrapper bg="white" isPaddingRequired={false}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ImageBackground
          style={[styles.topContainer, { height: isKeyboardVisible ? hp(15) : hp(25) }]}
          source={require('../assets/images/login-bg.jpg')}
        >
          <Text style={styles.logInText}>Sign In</Text>
        </ImageBackground>
        <View style={styles.container}>
          <View style={styles.punchLine}>
            <Text style={styles.mainBold}>Welcome Back!</Text>
            <Text style={styles.smallMain}>To keep connected please login with your personal info.</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput fontSize={18} editable maxLength={40} value={email} onChangeText={handleInputChange} placeholder="Enter Email" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput fontSize={18} editable maxLength={40} value={password} onChangeText={handlePasswordChange} placeholder="Enter Password" secureTextEntry />
            </View>
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forget Password!</Text>
          </TouchableOpacity>
          <View style={{ width: wp(95) }}>
            <CustomButton
              onPress={handleSignIn}
              title="Sign In"
              btnStyle={{ marginHorizontal: wp(3), marginTop: hp(3) }}
            />
          </View>
          <YStack style={{ marginTop: hp(4) }}>
            <SignupButtons onPress={handleGoogleAuth} title="Sign In with Google" btnStyle={{ marginHorizontal: wp(3), marginVertical: hp(0) }} />
          </YStack>
          <View style={{ flex: 1, width: wp(90), justifyContent: 'start', alignItems: 'center', paddingTop: hp(3) }}>
            <Text style={{ fontSize: 20, fontWeight: theme.fonts.medium }}>
              Create an account?  
              <Text onPress={() => router.push('signup')} style={styles.logIN}> Sign Up</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast swipeable={true} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  topContainer: {
    width: wp(100),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: wp(10),
  },
  logInText: {
    fontSize: 28,
    fontWeight: theme.fonts.bold,
  },
  punchLine: {
    width: wp(90),
    paddingTop: hp(4),
  },
  mainBold: {
    fontSize: 32,
    fontWeight: theme.fonts.extraBold,
  },
  smallMain: {
    fontSize: 14,
    color: theme.colors.grayDark,
  },
  containerWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    borderTopStartRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: 'white',
    paddingBottom: hp(3),
  },
  form: {
    paddingTop: hp(4),
  },
  inputContainer: {
    width: wp(90),
    marginVertical: hp(1),
    padding: hp(1.6),
    backgroundColor: theme.colors.grayLightBlue,
    borderRadius: theme.radius.xs,
  },
  forgotPassword: {
    width: wp(90),
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.semiBold,
  },
  logIN: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.bold,
  },
  containerLOader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:theme.colors.primary
  },
  horizontalLoad: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});






export default Signup;

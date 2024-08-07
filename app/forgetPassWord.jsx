import React , { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, ActivityIndicator, Alert } from 'react-native';
import ScreenWrapper from '../constants/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/CustomButton';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import OTPTextInput from 'react-native-otp-textinput'
import { sendVerificationEmail, verifyVerificationCode } from '../http/Auth';




const Signup = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading , setIsLoading] = useState(false)
  const [isEmailSent , setIsEmailSent] = useState(false)
  const [otpValue , setOTPVALUE] = useState('');
  const otp = useRef(null);

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

  const handleSendEmail = () => {
    setIsLoading(true)
    if(!email){
      Alert.alert('Reset Password' , "Please fill all the fields!")
      return
    }
    sendVerificationEmail({email,type:'email'}).then((res)=>{
        setIsLoading(false)
        if(res){
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: res?.data?.message,
              });
              setIsEmailSent(true)
        }
    }).catch((err)=>{
        setIsLoading(false)
        Toast.show({
            type: 'error',
            text1: 'Server Error',
            text2: 'Something Went Wrong!',
          });
    })
  };

  const handleVerifyEmail = ()=>{
    if(otpValue.length < 6){
        Alert.alert('OTP' , "OTP value must be 6 digit!")
        return
      }
    verifyVerificationCode({email,code:otpValue}).then((res)=>{
        setIsLoading(false)
        if(res){
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: res?.data?.message,
              });
              router.push('signin')
        }
    }).catch((err)=>{
        setIsLoading(false)
        Toast.show({
            type: 'error',
            text1: 'Server Error',
            text2: 'Something Went Wrong!',
          });
    })
  }

  const handleOtpChange = (value)=>{
    setOTPVALUE(value)
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
          <Text style={styles.logInText}>Reset Password</Text>
        </ImageBackground>
        <View style={styles.container}>
          <View style={styles.punchLine}>
            <Text style={styles.mainBold}>Forget Password ?</Text>
            <Text style={styles.smallMain}>No Issues we are here to help you out.</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput fontSize={18} editable maxLength={40} value={email} onChangeText={handleInputChange} placeholder="Enter Email" />
            </View>            
          </View>
          {isEmailSent ? <OTPTextInput ref={otp}
          handleTextChange={handleOtpChange} inputCount={6}/> : null}
          <View style={{ width: wp(95) }}>
           {!isEmailSent ? <CustomButton
              onPress={handleSendEmail}
              title="Send Verification Code"
              isLoading={isLoading}
              btnStyle={{ marginHorizontal: wp(3), marginTop: hp(3) }}
            /> : <CustomButton
            onPress={handleVerifyEmail}
            title="Reset Password"
            isLoading={isLoading}
            btnStyle={{ marginHorizontal: wp(3), marginTop: hp(3) }}
          />}
          </View>
          
          <View style={{ flex: 1, width: wp(90), justifyContent: 'start', alignItems: 'center', paddingTop: hp(3) }}>
            <Text style={{ fontSize: 20, fontWeight: theme.fonts.medium }}>
              Got your password?  
              <Text onPress={() => router.push('signin')} style={styles.logIN}> Sign In</Text>
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

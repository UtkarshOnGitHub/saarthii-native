import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ImageBackground, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Button, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "../constants/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import SignupButtons from "../components/SignUpButtons";
import { SignInFromAxios, SignUpFromAxios } from "../http/Auth";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "../helpers/ToastConfi";

const Signup = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setFullName] = useState('');

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

  const handleMobileNumber = (number) => {
    setMobileNumber(number)
  }

  const handleFullNameChange = (name) => {
    setFullName(name)
  }

  const handleSignUp = () => {
    setIsLoading(true)
    if(!email || !password){
      Alert.alert('SignUp' , "Please fill all the fields!")
      setIsLoading(false )
      return
    }

    SignUpFromAxios({ name, email, password, mobileNumber }).then((res) => {
      setIsLoading(true)
      setIsLoading(false)
      if (res.data.redirect) {
        router.push('signin');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Ooopss',
          text2: 'Something Went Wrong!',
          position:'bottom'
        });
      }
    }).catch((err) => {
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Ooopss',
          text2: 'Something Went Wrong!',
          position:'bottom'
        });
      });
  }

  return (
    <ScreenWrapper bg="white" isPaddingRequired={false}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // adjust this value based on your header height
      >
        <ImageBackground
          style={[styles.topContainer, { height: isKeyboardVisible ? hp(15) : hp(25) }]}
          source={require("../assets/images/login-bg.jpg")}
        >
          <Text style={styles.logInText}>Sign Up</Text>
        </ImageBackground>
        <View style={styles.container}>
          <View style={styles.punchLine}>
            <Text style={styles.mainBold}>Create Account</Text>
            <Text style={styles.smallMain}>To keep connected please create an account.</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput fontSize={18} editable maxLength={40} value={name} onChangeText={handleFullNameChange} placeholder="Your Name" placeholderTextColor={theme.colors.grayDark}/>
            </View>
            <View style={styles.inputContainer}>
              <TextInput fontSize={18} editable maxLength={40} value={email} onChangeText={handleInputChange} placeholder="Enter Email" placeholderTextColor={theme.colors.grayDark} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput fontSize={18} editable maxLength={10} keyboardType='numeric' value={mobileNumber} onChangeText={handleMobileNumber} placeholder="Mobile Number" placeholderTextColor={theme.colors.grayDark}/>
            </View>
            <View style={styles.inputContainer}>
              <TextInput fontSize={18} editable maxLength={40} value={password} onChangeText={handlePasswordChange} placeholder="Create Password" secureTextEntry placeholderTextColor={theme.colors.grayDark}/>
            </View>
          </View>
          <View style={{ width: wp(95) }}>
            <CustomButton
              onPress={handleSignUp}
              title="Sign Up"
              isLoading={isLoading}
              btnStyle={{ marginHorizontal: wp(3), marginTop: hp(3) }}
            />
          </View>
          <View style={{ marginTop: hp(4) }}>
            <SignupButtons title='Sign Up with Google' btnStyle={{ marginHorizontal: wp(3), marginVertical: hp(0) }} />
          </View>
          <View style={{ flex: 1, width: wp(90), justifyContent: 'start', alignItems: 'center', paddingTop: hp(3) }}>
            <Text style={{ fontSize: 20, fontWeight: theme.fonts.medium }}>Already Have an account?
              <Text onPress={() => router.push('signin')} style={styles.logIN}> Sign In</Text></Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast config={toastConfig}/>
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
    paddingTop: hp(4)
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
    alignItems: "center",
    borderTopStartRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: 'white',
    paddingBottom: hp(3),
  },
  form: {
    paddingTop: hp(4)
  },
  inputContainer: {
    width: wp(90),
    marginVertical: hp(1),
    padding: hp(1.6),
    backgroundColor: theme.colors.grayLightBlue,
    borderRadius: theme.radius.xs,
    fontSize: wp(32)
  },
  forgotPassword: {
    width: wp(90),
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.semiBold,
  },
  auth: {
    width: wp(100),
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'column'
  },
  divider: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  logIN: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.bold,
  }
});

export default Signup;

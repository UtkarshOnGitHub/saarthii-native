import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import ScreenWrapper from "../constants/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";

const signup = () => {
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image source={require("../assets/images/defaultUser.png")} />
        <View>
          <View style={styles.inputContainer}>
            <TextInput editable maxLength={40} placeholder="Enter Email" />
          </View>
          <View style={styles.inputContainer}>
            <TextInput editable maxLength={40} placeholder="Enter Password" />
          </View>
        </View>
        <View style={{ width: wp(100) }}>
          <CustomButton
            title="Sign In"
            btnStyle={{ marginHorizontal: wp(3), marginVertical: wp(10) }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputContainer: {
    width: wp(85),
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 1,
    marginVertical:hp(2)
  },
});

export default signup;

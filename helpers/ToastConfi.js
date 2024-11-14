import { BaseToast, ErrorToast } from "react-native-toast-message";
import { wp } from "./common";
import { theme } from "../constants/theme";
import { StyleSheet, Text, View } from "react-native";


export const toastConfig = {

  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.primary }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red', width: wp(70) }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  tomatoToast: ({ text1, text2 }) => (
    <View style={styles.toastContainer}>
    <View style={styles.toastContent}>
      <Text style={styles.toastText}>{text1}</Text>
      {text2 && <Text style={styles.toastText2}>{text2}</Text>}
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
  toastContainer: {
    zIndex: 9999,

    borderRadius: 30, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: wp(50), 
    backgroundColor: theme.colors.grayLightBlue, 
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)', 
    animation: 'fadeIn 0.5s ease-out',
    borderColor: theme.colors.gray, 
    borderWidth:1
  },
  toastContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    fontStyle:'italic'
  },
  toastText2: {
    fontSize: 12,
    color:theme.colors.grayDark,
    textAlign: 'center',
    fontStyle:'italic'
  },
});

import { BaseToast, ErrorToast } from "react-native-toast-message";
import { wp } from "./common";
import { theme } from "../constants/theme";

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
        style={{ borderLeftColor: 'red',width:wp(70) }}
        contentContainerStyle={{ paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, borderRadius:theme.radius.lg, width: wp(60), backgroundColor: 'white' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };
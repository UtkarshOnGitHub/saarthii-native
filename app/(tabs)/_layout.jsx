import { router, Tabs } from "expo-router";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import ScreenWrapper from "../../constants/ScreenWrapper";
import Toast from "react-native-toast-message";
import { useAuth } from "../../Context/AuthContext";
import { ScrollView } from "react-native";


export default function RootLayout(){
    const { token, updateToken, deleteToken } = useAuth();

    return<ScreenWrapper>
    <Tabs screenOptions={{

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grayDark, 
      }}>
        <Tabs.Screen name='index'  options={{headerShown:false , title:'Home' , tabBarIcon:({color})=>(
            <FontAwesome name='home' size={28} color={color} />
        )}} />
                                <Tabs.Screen name='journeys' options={{headerShown:false , title:'Journeys' , tabBarIcon:({color})=>(
            <FontAwesome5 name='route' size={28} color={color}/>
        )}} />
        <Tabs.Screen name='chat' options={{headerShown:false , title:'Chat' , tabBarIcon:({color})=>(
            // <FontAwesome name='user' size={28} color={color}/>
            <AntDesign name="message1" size={28} color={color} />
        )}} />
                <Tabs.Screen name='recents' options={{headerShown:false , title:'Settings' , tabBarIcon:({color})=>(
            <FontAwesome name='cog' size={28} color={color}/>
        )}} />

    </Tabs>
    <Toast  swipeable={true} />
    </ScreenWrapper> 
}
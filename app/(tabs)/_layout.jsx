import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import ScreenWrapper from "../../constants/ScreenWrapper";


export default function RootLayout(){
    return<ScreenWrapper>
    <Tabs screenOptions={{

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grayDark, 
      }}>
        <Tabs.Screen name='index'  options={{headerShown:false , title:'Home' , tabBarIcon:({color})=>(
            <FontAwesome name='home' size={28} color={color} />
        )}} />
                                <Tabs.Screen name='news' options={{headerShown:false , title:'Journeys' , tabBarIcon:({color})=>(
            <FontAwesome name='folder' size={28} color={color}/>
        )}} />
        <Tabs.Screen name='profile' options={{headerShown:false , title:'Profile' , tabBarIcon:({color})=>(
            <FontAwesome name='user' size={28} color={color}/>
        )}} />
                <Tabs.Screen name='recents' options={{headerShown:false , title:'Settings' , tabBarIcon:({color})=>(
            <FontAwesome name='cog' size={28} color={color}/>
        )}} />

    </Tabs>
    </ScreenWrapper> 
}
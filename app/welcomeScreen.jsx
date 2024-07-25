
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from "../constants/ScreenWrapper"
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';

export const  WelcomeScreen =()=> {
    return (
        <ScreenWrapper bg='white'>
            <StatusBar style='dark'/>
            {/* <ImageBackground> */}
            <ImageBackground style={styles.container} blurRadius={6} source={require('../assets/images/welcomePlane.png')}>
                {/* Welcome Image */}
                <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/logo.png')}/>
                {/* Text */}
                <Text style={styles.punchLine}>Discover Travel Buddies With Saarthii</Text>
                {/* Footer */}
                <View style={styles.footer}>
                    <CustomButton onPress={()=>{router.push('signup')}} title='Get Started' btnStyle={{marginHorizontal:wp(3),marginVertical:wp(10)}}></CustomButton>
                </View>
            </ImageBackground>
        </ScreenWrapper>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor:'white',
        backgroundImage:'',
        paddingHorizontal:wp(4),
    },
    welcomeImage:{
        height:hp(30),
        width:wp(100),
        alignSelf:'center',
        // marginVertical:hp(10)
    },
    title:{
        color:'white',
        fontSize:hp(4),
        width:wp(100),
        textAlign:'center',
        fontWeight:theme.fonts.extraBold
    },
    punchLine:{
        textAlign:'center',
        paddingHorizontal:wp(15),
        fontSize:hp(1.8),
        color:'white',
        marginBottom:hp(5),
        marginTop:-hp(5)
    },
    footer:{
        gap:30,
        width:wp(100)
    }
})

export default WelcomeScreen

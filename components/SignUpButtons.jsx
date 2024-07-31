import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'
import GoogleIcon from './svg/GoogleSvg'
import { Button } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';

const SignupButtons = ({
    btnStyle,textStyle,onPress=()=>{},title='',hasShadow=false,loading=false
}) => {

    const shadowStyle = {
        shadowColor:theme.colors.dark,
        shadowOffset:{height:0,width:100},
        shadowOpacity:0.2,
        shadowRadius:8,
        elevation:4
        
    }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn,btnStyle,hasShadow && shadowStyle]}>
        {/* <View style={styles.icon}>
            <GoogleIcon  width="100%" height='50%'/>
        </View>
        
        <Text style={[styles.text,textStyle]}>{title}</Text> */}
        <Button style={[styles.btn,btnStyle,hasShadow && shadowStyle]} onPress={onPress}>
        <View style={styles.icon}>
            <GoogleIcon  width="100%" height='50%'/>
        </View>
            {title}
        </Button>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn:{
        width:wp(90),
        flexDirection:'row',
        height:hp(5.6),
        justifyContent:'center',
        alignItems:'center',
        borderCurve:'continuous',
        // borderWidth:1,
        borderRadius:5,

    },
    text:{
        fontSize:hp(2),
        color:'black',
        fontWeight:theme.fonts.medium
    },
    icon:{
        width:50,
        height:50,
        position:'absolute',
        left:0,
        display:'flex',
        justifyContent:'center'
    }
})

export default SignupButtons
import { View, Text, Pressable, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'

const CustomButton = ({
    btnStyle,textStyle,onPress=()=>{},title='',hasShadow=false,isLoading=false
}) => {

    const shadowStyle = {
        shadowColor:theme.colors.dark,
        shadowOffset:{height:0,width:100},
        shadowOpacity:0.2,
        shadowRadius:8,
        elevation:4
        
    }

  return (
    <>
    { isLoading ? <View style={{marginHorizontal: wp(3), marginTop: hp(3)}}><ActivityIndicator size={"large"}  color={theme.colors.primary}/></View>:
    <TouchableOpacity onPress={onPress} style={[styles.btn,btnStyle,hasShadow && shadowStyle]}>
        <Text style={[styles.text,textStyle]}>{title}</Text>
    </TouchableOpacity>}
    </>
  )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:theme.colors.primary,
        height:hp(5.6),
        justifyContent:'center',
        alignItems:'center',
        borderCurve:'continuous',
        borderRadius:5,
    },
    text:{
        fontSize:hp(1.9),
        color:'white',
        fontWeight:theme.fonts.bold
    }
})

export default CustomButton
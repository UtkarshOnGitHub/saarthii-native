import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const CustomButton = ({
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
    <Pressable onPress={onPress} style={[styles.btn,btnStyle,hasShadow && shadowStyle]}>
        <Text style={[styles.text,textStyle]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:theme.colors.primary,
        height:hp(6.6),
        justifyContent:'center',
        alignItems:'center',
        borderCurve:'continuous',
        borderRadius:5
    },
    text:{
        fontSize:hp(2.5),
        color:'white',
        fontWeight:theme.fonts.bold
    }
})

export default CustomButton
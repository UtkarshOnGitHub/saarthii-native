import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ScreenWrapper({children , bg , isPaddingRequired = true}) {

    const {top} = useSafeAreaInsets()
    const paddingTop = isPaddingRequired  ? (top > 0 ?top+5 : 30) : 0
    return (
      <View style={{flex:1,paddingTop,backgroundColor:bg}}>
        {
            children
        }
      </View>
    )
}

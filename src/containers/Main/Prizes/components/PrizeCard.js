import React from 'react';
import {View,Image,Pressable} from 'react-native';
import {Text} from '@ui-kitten/components'

import {env} from '../../../../constants'

export default ({category,onPressCategory}) => {
     return (
        <Pressable onPress={() => {
            onPressCategory(category)
        }} style={{width:'45%',paddingHorizontal:3}}>
            <Image source={{uri:env.server + 'storage/' + category.image}}  style={{height:150,width:'100%'}} resizeMode="contain" />
            <View style={{marginTop:5}}>
                <Text category="s1" style={{textAlign:'center'}}>{category.title}</Text>
            </View>
        </Pressable>
     )
}
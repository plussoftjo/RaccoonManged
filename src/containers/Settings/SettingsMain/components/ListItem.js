import React from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components'
import {AntDesign} from '@expo/vector-icons'

export default ({title,icon,onPress,caret = true,rtl}) => {
     return (
        <TouchableOpacity onPress={() => {
            onPress();
        }} style={{width:'100%',padding:15,flexDirection:'row',justifyContent:'space-between',marginVertical:2,backgroundColor:'rgba(200,80,25,0.1)',alignItems:'center',borderRadius:5}}>
            <View style={{flexDirection:'row'}}>
                <AntDesign name={icon} size={18} color="#7e7e7e"/>
                <Text style={{marginHorizontal:4}}>{title}</Text>
            </View>
            <View>
            {caret &&
                <AntDesign name={rtl ? 'caretleft':'caretright'} color="black" size={14} />
            }
            </View>
        </TouchableOpacity>
     )
}
import React from "react";
import { View, Image } from "react-native";
import { Text } from "@ui-kitten/components";


import {Models,env,colors} from '../../../../constants'
import {translate} from '../../../../translations'
export default ({user}) => {
  return (
    <View>
      <View style={{ padding: 20, flexDirection: "row" }}>
        <Text style={{ color: "white" }} category="h1">
          {translate('settings_main.header')}
        </Text>
      </View>
      <View
        style={{
          marginTop: 15,
          width: Models.window.width,
          padding: 15,
          backgroundColor: "rgba(0,0,0,0.1)",
          borderTopColor: "#7e7e7e",
          borderTopWidth: 1,
          borderBottomColor: "#7e7e7e",
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical:5,
          
        }}
      >
        <Image
          source={{ uri: env.server + user.avatar }}
          style={{
            width: 84,
            height: 84,
            borderRadius: 84 / 2,
            borderColor: "white",
            borderWidth: 1,
          }}
        />
        <View style={{marginHorizontal:10}}>
          <Text category="h5" style={{ color: "white" }}>
            {user.name}
          </Text>
          <Text category="h5" style={{ color: "white" }}>
            {user.phone}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          width: Models.window.width,
          padding: 15,
          backgroundColor: "rgba(0,0,0,0.1)",
          borderTopColor: "#7e7e7e",
          borderTopWidth: 1,
          borderBottomColor: "#7e7e7e",
          borderBottomWidth: 1,
          flexDirection: 'column',
          paddingVertical:5,
          
        }}
      >
      <View style={{flexDirection:'row',alignItems:"flex-end"}}>
      <Text category="h4" style={{textAlign:'left',color:'white'}}>{translate('settings_main.code')}: </Text>
      <Text category="h3" style={{textAlign:'left',color:colors.cottonCandy,textDecorationLine:'underline'}}>{user.id}</Text>

      </View>
        <Text category={'s1'} style={{textAlign:'left',color:'white',marginTop:5}}>{translate('settings_main.send_this_code')}</Text>
      </View>
    </View>
  )
};

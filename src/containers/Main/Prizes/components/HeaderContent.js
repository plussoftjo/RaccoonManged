import React from "react";
import { View,Image } from "react-native";
import { Text } from '@ui-kitten/components'

import {env} from '../../../../constants'
import {translate} from '../../../../translations'

export default ({user,coins,lang}) => {
  return (
    <View>
      <View
        id="HeaderContent"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
          paddingTop:30
        }}
      >
        <Text category="s1" style={{ color: "white" }}>
          {translate('prizes.header',lang)}
        </Text>
        <Image
          source={{ uri: env.server + user.avatar }}
          style={{
            width: 42,
            height: 42,
            borderRadius: 42 / 2,
            borderColor: "white",
            borderWidth: 1,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 15,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.1)",
          borderTopColor: "#7e7e7e",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderBottomColor: "#7e7e7e",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Text category="h3" style={{ color: "white" }}>
        {translate('prizes.total_coins',lang)}
        </Text>
        <Text category="h3" style={{ color: "white" }}>
          {coins}
        </Text>
      </View>
    </View>
  );
};

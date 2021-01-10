import React from "react";
import { View, Image, StyleSheet,Pressable } from "react-native";
import { Text } from "@ui-kitten/components";
import { Entypo } from "@expo/vector-icons";

import {env,Images} from '../../../../constants'
import {translate} from '../../../../translations'

export default (props) => {
  let {user} = props;
  return (
    <View style={{padding:15}}>
      <View style={styles.headerContainer}>
        <Image source={require('../../../../assets/logo/raccoon.png')} style={{width:32,height:32}} resizeMode="contain" />
        <Pressable onPress={() => {
          props.navigation.navigate('Profile',{id:user.id})
        }}>

        </Pressable>
        <Image
          source={{ uri: env.server + user.avatar }}
          style={styles.imageCard}
        />
      </View>
      <View style={styles.headerContentConatiner}>
        <Text style={{ color: "white", fontWeight: "bold",textAlign:'left' }} category="h1">
          {translate('main.header')} {user.name}
        </Text>
        <Text category="s1" style={{ color: "white", marginTop: 10,textAlign:'left' }}>
        {translate('main.subtitle')}
        </Text>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  imageCard: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    borderColor: "white",
    borderWidth: 1,
  },
  headerContentConatiner: {
    padding: 20,
    paddingTop: 0,
    paddingHorizontal:0
  },
});

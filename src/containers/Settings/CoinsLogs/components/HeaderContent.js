import React from "react";
import { View, Pressable } from "react-native";
import { Text, Icon } from "@ui-kitten/components";

export default ({ navigation,rtl,title }) => {
  return (
    <View
      style={{
        padding: 15,
        paddingTop: 30,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon
          name={rtl ? 'arrow-forward-outline':'arrow-back-outline'}
          style={{ width: 32, height: 32 }}
          fill="white"
        />
      </Pressable>

      <View style={{ width: 10 }}></View>
      <Text style={{ color: "white" }} category="s1">
        {title}
      </Text>
    </View>
  );
};

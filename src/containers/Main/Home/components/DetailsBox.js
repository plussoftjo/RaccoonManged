import React from "react";
import { View, Image } from "react-native";
import { Text } from "@ui-kitten/components";

export default ({ title, value, image, color }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 5,
        paddingHorizontal: 5,
        borderColor: "#7e7e7e",
        borderWidth: 0.5,
        borderRadius: 6,
        marginHorizontal: 5,
        backgroundColor: color,
      }}
    >
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 5,
          height: "100%",
          alignItems: "center",
          zIndex: 101,
        }}
      >
        <Image
          source={image}
          style={{ height: "100%", width: 20 }}
          resizeMode="contain"
        />
      </View>
      <Text category="s2" style={{textAlign:'left'}}>{title}</Text>
      <View style={{ padding: 10, zIndex: 103 }}>
        <Text category="h5" style={{ textAlign: "center" }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

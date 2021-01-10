import React from "react";
import { View,ScrollView } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

export default () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View id="Seketlton">
        <SkeletonContent
          containerStyle={{
            flexDirection: "row",
            alignItems: "flex-end",
            padding: 2,
            paddingHorizontal: 13,
          }}
          isLoading={true}
          layout={[
            { key: "HeaderImage", width: 50, height: 50, borderRadius: 25 },
            {
              key: "name",
              width: 100,
              height: 20,
              borderRadius: 3,
              marginHorizontal: 5,
            },
          ]}
        />
        <SkeletonContent
          containerStyle={{ padding: 15 }}
          isLoading={true}
          layout={[
            { key: "PostImage", width: "100%", height: 200, borderRadius: 10 },
            {
              key: "PostContent",
              width: "75%",
              height: 20,
              borderRadius: 3,
              marginTop: 5,
            },
            {
              key: "PostContent2",
              width: "60%",
              height: 20,
              borderRadius: 3,
              marginTop: 5,
            },
          ]}
        />
      </View>
      <View id="Seketlton">
        <SkeletonContent
          containerStyle={{
            flexDirection: "row",
            alignItems: "flex-end",
            padding: 2,
            paddingHorizontal: 13,
          }}
          isLoading={true}
          layout={[
            { key: "HeaderImage2", width: 50, height: 50, borderRadius: 25 },
            {
              key: "name",
              width: 100,
              height: 20,
              borderRadius: 3,
              marginHorizontal: 5,
            },
          ]}
        />
        <SkeletonContent
          containerStyle={{ padding: 15 }}
          isLoading={true}
          layout={[
            { key: "PostImage2", width: "100%", height: 200, borderRadius: 10 },
            {
              key: "PostContent2",
              width: "75%",
              height: 20,
              borderRadius: 3,
              marginTop: 5,
            },
            {
              key: "PostContent22",
              width: "60%",
              height: 20,
              borderRadius: 3,
              marginTop: 5,
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

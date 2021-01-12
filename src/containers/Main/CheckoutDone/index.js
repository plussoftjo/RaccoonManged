import React from "react";
import { View, Pressable } from "react-native";
import { Layout, Text, Icon, Button } from "@ui-kitten/components";
import { connect } from "react-redux";

import { GradientSpace } from "../../../components";
import { translate } from "../../../translations";

let CheckoutDone = (props) => {
  let { order } = props.user;
  let {lang} = props.locale
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <GradientSpace />
      <Text category="h3" style={{ color: "white" }}>
        {translate("checkout_done.order_complete",lang)}
      </Text>
      <View style={{ paddingTop: 20 }}>
        <Text category="s1" style={{ color: "white" }}>
        {translate("checkout_done.you_have_get_code",lang)}
        </Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          padding: 10,
          borderRadius: 3,
          backgroundColor: "rgba(0,0,0,0.05)",
          marginTop: 10,
        }}
      >
        <Text category="h3" style={{ color: "white" }}>
          {order.codes.code}
        </Text>
      </View>
      <View style={{ paddingTop: 15 }}>
        <Button
          onPress={() => {
            props.navigation.navigate("BottomTapNavigation");
          }}
        >
          {translate("checkout_done.back_to_home",lang)}
        </Button>
      </View>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDone);

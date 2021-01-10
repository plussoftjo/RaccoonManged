import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Components
import { HeaderContent, ListItem } from "./components";

// Global Components
import { Headers, ContentCard, GradientSpace } from "../../../components";

// Constants
import { StorageToken } from "../../../constants";
import { translate } from "../../../translations";

let SettingsMain = (props) => {
  let { user } = props.user;
  let { navigation,locale } = props;

  let _logout = async () => {
    try {
      await AsyncStorage.removeItem(StorageToken.userToken);
      navigation.popToTop();
    } catch (error) {}
  };
  return (
    <Layout style={styles.container}>
      <GradientSpace />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderContent user={user} />
        <View style={{ height: 15 }}></View>
        <ContentCard>
          <View style={{ marginTop: 15 }} />
          <ListItem
            title={translate('settings_main.user_details')}
            icon="edit"
            onPress={() => navigation.navigate("UserDetails")}
            rtl={locale.rtl}
          />
          <ListItem
            title={translate('settings_main.my_orders')}
            icon="book"
            onPress={() => navigation.navigate("Orders")}
            rtl={locale.rtl}
          />
          <ListItem
            title={translate('settings_main.coins_logs')}
            icon="bars"
            onPress={() => navigation.navigate("CoinsLogs")}
            rtl={locale.rtl}
          />
          <ListItem
            title={translate('settings_main.languages')}
            icon="filetext1"
            onPress={() => navigation.navigate("Language")}
            rtl={locale.rtl}
          />
          <ListItem caret={false} title={translate('settings_main.logout')} rtl={locale.rtl} icon="logout" onPress={_logout} />
        </ContentCard>
      </ScrollView>
    </Layout>
  );
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: "10%",
    flex: 1,
    padding: 15,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMain);

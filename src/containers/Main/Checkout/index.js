import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import { connect } from "react-redux";

// Global Component
import { GradientSpace, ContentCard, Toast,Loader } from "../../../components";

// Local Components
import { HeaderContent } from "./components";

// Constants
import { env } from "../../../constants";
import { apis } from "../../../services";
import { translate } from "../../../translations";

// Stores
import { UserActions } from "../../../stores";

let Checkout = (props) => {
  let { navigation } = props;
  let { selectedSubCategory, selectedCategory } = props.prizes;
  let { coins, user, coinsLogs, orders } = props.user;
  let {rtl} =props.locale

  let [hasToast, setHasToast] = React.useState(null);
  let [isLoad,setIsLoad] = React.useState(false)

  let Store = () => {
    setIsLoad(true);
    let data = {
      user_id: user.id,
      prizes_sub_categories_id: selectedSubCategory.id,
      prizes_categories_id: selectedCategory.id,
      fee: selectedSubCategory.fee,
    };
    if (coins < selectedSubCategory.fee) {
      setHasToast("You Don't Have Enough Coins");
      setTimeout(() => {
        setHasToast(null);
      }, 3000);
    } else {
      apis.order.store(
        data,
        (res) => {

          // First Set New Coins
          props.setCoins(res.newCoin);

          // Add Logs To Coins Logs
          // let _lastCoinsLogs = coinsLogs;
          // _lastCoinsLogs.push(res.CoinsLogs);

          // props.setCoinsLogs(_lastCoinsLogs);

          let _lastOrders = orders;
          _lastOrders.push(res.order);

          props.setOrders(_lastOrders);

          props.setOrder(res.order);
          
          setIsLoad(false)

          navigation.navigate("CheckoutDone");
        },
        (err) => {
          if (err.response.message == "There are no code") {
            setHasToast(translate('checkout.there_are_no_code'));
            setTimeout(() => {
              setHasToast(null);
            }, 3000);
          } else {
            setHasToast(translate('checkout.there_are_problem'));
            setTimeout(() => {
              setHasToast(null);
            }, 3000);
          }

          setIsLoad(false)
          console.log(err.response);
        }
      );
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <GradientSpace />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <HeaderContent
          navigation={navigation}
          title={selectedSubCategory.title}
          rtl={rtl}
        />
        <View style={{ padding: 25, paddingTop: 10 }}>
          <Image
            source={{
              uri: env.server + "storage/" + selectedSubCategory.image,
            }}
            style={{ width: "100%", height: 180, borderRadius: 5 }}
            resizeMode="contain"
          />
          <Text
            style={{
              paddingTop: 10,
              color: "white",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {selectedSubCategory.description}
          </Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
          }}
        >
          <ContentCard>
            <Text category="h4">{translate('checkout.buy_now')}</Text>
            <View style={{ height: 10 }}></View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: "#7e7e7e",
                borderWidth: 1,
                backgroundColor: "rgba(255,255,255,0.5)",
                borderRadius: 3,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text category="s1">{translate('checkout.total_coins')}</Text>
              <Text category="s1">{coins}</Text>
            </View>
            <View
              style={{
                paddingTop: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text category="h5">{translate('checkout.price')}</Text>
              <Text category="s1">{selectedSubCategory.fee}</Text>
            </View>
            <Button
              style={{ marginTop: 30 }}
              onPress={() => {
                Store();
              }}
            >
              {translate('checkout.buy_now')}
            </Button>
          </ContentCard>
        </View>
      </ScrollView>
      {hasToast && <Toast title={hasToast} status={"success"} />}
      {isLoad && <Loader />}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    prizes: state.prizes,
    user: state.user,
    locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCoins: (item) => dispatch(UserActions.setCoins(item)),
    setCoinsLogs: (item) => dispatch(UserActions.setCoinsLogs(item)),
    setOrders: (item) => dispatch(UserActions.setOrders(item)),
    setOrder: (item) => dispatch(UserActions.setOrder(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

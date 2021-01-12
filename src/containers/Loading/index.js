import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

// Constants
import { StorageToken } from "../../constants";

// Services
import { apis, LocaleLoader } from "../../services";

// Stores
import { connect } from "react-redux";
import { UserActions, PrizesActions,SettingsActions } from "../../stores";

let Loading = (props) => {
  let {
    navigation,
    setUser,
    setCoinsLogs,
    setTodayCoins,
    setPosts,
    setCounts,
    setSocialTasks,
    setPrizesCategories,
    setOrders,
    setLocale
  } = props;
  const isFocused = useIsFocused();
  /**
   *
   * @checker {Checker is about check the things inside our app}
   */

  let InstallAssets = (user_id) => {
    let installMainIndex = () => {
      let data = {
        user_id: user_id,
      };
      apis.main.index(
        data,
        (res) => {
          setCoinsLogs(res.coinsLogs);
          setTodayCoins(res.todayCoins);
          setPosts(res.posts);

          // Set Counts is for follows and followers
          setCounts({
            follows: res.follows,
            followers: res.followers,
          });

          let _todayFollowPersion = false;
          let _todayMakePost = false;
          let _todayMakeComment = false;
          // Social Tasks Gets
          if (res.todayFollowPersion >= 1) {
            _todayFollowPersion = true;
          } else {
            _todayFollowPersion = false;
          }

          if (res.todayMakePost >= 1) {
            _todayMakePost = true;
          } else {
            _todayMakePost = false;
          }

          if (res.todayMakeComment >= 1) {
            _todayMakeComment = true;
          } else {
            _todayMakeComment = false;
          }

          let socialTasks = {
            todayFollowPersion: _todayFollowPersion,
            todayMakePost: _todayMakePost,
            todayMakeComment: _todayMakeComment,
          };

          setSocialTasks(socialTasks);

          setPrizesCategories(res.prizesCategories);
          // Set Orders
          setOrders(res.orders);
          setTimeout(() => {
            navigation.navigate("MainNavigatin");
          }, 1500);
        },
        (err) => {
          console.log(err);
        }
      );
    };

    // Call Functions
    installMainIndex();
  };

  let checker = async () => {

    await LocaleLoader();

    let _locale = await AsyncStorage.getItem(StorageToken.localeToken);
    if(!_locale) {
      setLocale({
        lang: "en",
        rtl: false,
      });
    }else {
      if (_locale == "en") {
        setLocale({
          lang: "en",
          rtl: false,
        });
      } else if (_locale == "ar") {
        setLocale({
          lang: "ar",
          rtl: true,
        });
      }
    }
        
    // First lets check if its first time open the app
    // let first_time = await AsyncStorage.getItem(StorageToken.firstTime);
    // if (!first_time) {
    //   // If The first time user open the app
    //   navigation.navigate("Steps");
    //   return;
    // }

    // Check if user login or not
    let _userToken = await AsyncStorage.getItem(StorageToken.userToken);
    if (!_userToken) {
      // If Not Auth Navigation to auth
      navigation.navigate("Auth");
      return;
    }

    

    // If Auth @setUser in the stores
    let _token = "Bearer " + _userToken;
    apis.user.auth(
      _token,
      (res) => {
        setUser(res);
        InstallAssets(res.id);
      },
      (err) => {
        console.log(err.response);
        navigation.navigate("Auth");
      }
    );
  };

  // UseEffect
  useEffect(() => {
    // Checker Call

    checker();
  }, [isFocused]);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/backgrounds/loading.png")}
    >
      <Image
        source={require("../../assets/logo/logo.png")}
        style={styles.imageCard}
        resizeMode="contain"
      />
      <View style={styles.pt30}>
        <Spinner status="basic" />
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
    setCoinsLogs: (item) => dispatch(UserActions.setCoinsLogs(item)),
    setTodayCoins: (item) => dispatch(UserActions.setTodayCoins(item)),
    setPosts: (item) => dispatch(UserActions.setPosts(item)),
    setCounts: (item) => dispatch(UserActions.setCounts(item)),
    setSocialTasks: (item) => dispatch(UserActions.setSocialTasks(item)),
    setPrizesCategories: (item) =>
      dispatch(PrizesActions.setPrizesCategories(item)),
    setOrders: (item) => dispatch(UserActions.setOrders(item)),
    setLocale:(item) => dispatch(SettingsActions.setLocale(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);

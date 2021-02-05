import React from "react";
import { View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import styles from "../styles";
import { TaskList } from "../components";
import { apis, Helper } from "../../../../services";
import { UserActions } from "../../../../stores";
import {Images} from '../../../../constants'
import {translate} from '../../../../translations'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
let Tasks = ({ user, setShowToast, setCoinsLogs, setTodayCoins, setCoins,locale }) => {
  let _loadAds = async() => {
    // TODO: Change to not dev
    // Deploy: ca-app-pub-8749426160957410/5937621142
    // Test: ca-app-pub-3940256099942544/1033173712
    let _AdMobID = Platform.OS == 'android'? 'ca-app-pub-8749426160957410/5937621142':'ca-app-pub-8749426160957410/9210011114'
    await AdMobInterstitial.setAdUnitID(_AdMobID);
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
  }
  let [isSync,setIsSync] = React.useState(false)
  let {lang} = locale
  let TaskStepsChecker = (title, has) => {
    let takenToday = Helper.coinsLogsChecker(title, user.coinsLogs);
    if (takenToday) {
      return false;
    } else {
      if (has) {
        return true;
      }
      return false;
    }
  };

  let _insertCoins = (coinsLog, coin) => {
    let _coinsLogs = user.coinsLogs;
    _coinsLogs.push(coinsLog);
    setCoinsLogs(_coinsLogs);
    let _newTodayCoins = user.todayCoins + coin;
    let _newCoins = user.coins + coin;
    setTodayCoins(_newTodayCoins);
    setCoins(_newCoins);
  };

  let _recive = (coin, scope) => {
    if(!isSync) {
      setIsSync(true)
    let data = {
      user_id: user.user.id,
      coin: coin,
      way: scope,
    };
    _loadAds()
    apis.coins.resiveCoins(
      data,
      (res) => {
        // TODO: Coins added methods
        setShowToast(true);
        _insertCoins(res.coinsLog, coin);
        setTimeout(() => {
          setShowToast(false);
        }, 3500);
        setIsSync(false)
      },
      (err) => {
        console.log(err.response);
        setIsSync(false)
      }
    );
    }
  };
  return (
    <View style={styles.taskGroup} id="TaskGroup">
      <View style={styles.taskHeader}>
        <Text category="h5">{translate('coins.social_tasks',lang)}</Text>
      </View>
      <TaskList
        title={translate('coins.tasks.follow_person',lang)}
        scope={"Follow Persion"}
        coins={2}
        done={TaskStepsChecker("Follow Persion", user.socialTasks.todayFollowPersion)}
        recive={_recive}
        icon={Images.Follow}
        translate={translate}
        rtl={locale.rtl}
        lang={lang}
      />
      <TaskList
        title={translate('coins.tasks.make_post',lang)}
        scope={"Make Post"}
        coins={2}
        done={TaskStepsChecker("Make Post", user.socialTasks.todayMakePost)}
        recive={_recive}
        icon={Images.Post}
        translate={translate}
        rtl={locale.rtl}
        lang={lang}
      />
      <TaskList
        title={translate('coins.tasks.comment_in_post',lang)}
        scope={"Comment in post"}
        coins={3}
        done={TaskStepsChecker("Comment in post", user.socialTasks.todayMakeComment)}
        recive={_recive}
        icon={Images.Comment}
        translate={translate}
        rtl={locale.rtl}
        lang={lang}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCoinsLogs: (item) => dispatch(UserActions.setCoinsLogs(item)),
    setTodayCoins: (item) => dispatch(UserActions.setTodayCoins(item)),
    setCoins: (item) => dispatch(UserActions.setCoins(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

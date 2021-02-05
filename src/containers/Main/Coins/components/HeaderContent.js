import React, { useRef } from "react";
import { View, Image, Animated,TouchableOpacity,Platform } from "react-native";
import { Text } from "@ui-kitten/components";
import {
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { connect } from "react-redux";

import {apis} from '../../../../services'
import {env,Images} from '../../../../constants'
import {UserActions} from '../../../../stores'
import {translate} from '../../../../translations'


let HeaderContent = (props) => {
  let { user, steps,todayCoins,coins,coinsLogs } = props.user;
  let {lang} = props.locale
  let {setShowToast,setCoinsLogs,setTodayCoins,setCoins,navigation,rtl} = props;
  let zoom = useRef(new Animated.Value(1)).current;


  let AdMobRewardedList = () =>{
    AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',function (event) {
      _recive();
    });
  }
  let _insertCoins = (coinsLog,coin) => {
    let _coinsLogs = coinsLogs;
    _coinsLogs.push(coinsLog);
    setCoinsLogs(_coinsLogs);
    let _newTodayCoins = todayCoins + coin;
    let _newCoins = coins + coin;
    setTodayCoins(_newTodayCoins)
    setCoins(_newCoins)
    AdMobRewarded.removeEventListener("rewardedVideoDidRewardUser")

  }

  let _recive = () => {

    let data = {
      user_id: user.id,
      coin: 3,
      way: 'Rewarded Ads',
    };
    apis.coins.resiveCoins(
      data,
      (res) => {
        setShowToast(true)
        _insertCoins(res.coinsLog,3);
        setTimeout(() => {
          setShowToast(false)
        },3500)
      },
      (err) => {
        console.log(err);
      }
    );
  };


 
  React.useEffect(() => {
    if (props.scrollY < 0) {
      let _y = props.scrollY * -1;
      _y = _y * 0.003;
      Animated.timing(zoom, {
        toValue: 1 + _y,
        duration: 1,
        useNativeDriver: true,
      }).start();
    }
    if (props.scrollY > 0) {
      let _y = props.scrollY * 0.003;
      Animated.timing(zoom, {
        toValue: 1 - _y,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }

    AdMobRewardedList()
    return () => {
      AdMobRewarded.removeAllListeners()
    }
  });




  let showads = async()=> {
    if(Platform.OS !== 'web') {
      // Deploy: ca-app-pub-8749426160957410/7434535647 
      // Dev: ca-app-pub-3940256099942544/5224354917
      let _AdsID = Platform.OS == 'android'?'ca-app-pub-8749426160957410/7434535647':'ca-app-pub-8749426160957410/5789640850'
      await AdMobRewarded.setAdUnitID(_AdsID);
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
    }
  }

  return (
    <View style={{padding:15}}>
      <Animated.View style={{ transform: [{ scale: zoom }] }}>
        <View
          id="HeaderContent"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text category="h3" style={{ color: "white" }}>
            {translate('coins.header',lang)}
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Profile',{
              id:user.id
            });
          }}>
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
          </TouchableOpacity>
          
        </View>
        <View style={{ marginVertical: 15, marginHorizontal: 0 }}>
          <View
            style={{
              padding: 15,
              borderRadius: 15,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          >
            <Text category="s1" style={{ color: "white",textAlign:'left' }}>
            {translate('coins.today',lang)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text category="h3" style={{ color: "white" }}>
                {todayCoins}
              </Text>
              
              <TouchableOpacity onPress={() => {
                showads();
              }}
               style={{position:'relative'}} 
              >
                <View style={{position:'absolute',right:-5,top:-5,zIndex:100,borderRadius:50,backgroundColor:'white',padding:3,borderColor:'#FFD700',borderWidth:1}}>
                  <Text style={{color:'#FFD700',fontWeight:'bold'}}>+3</Text>
                </View>
                <Image source={Images.VideoAds} style={{width:60,height:60,borderRadius:30}} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text category="s1" style={{ color: "white" }}>
              {translate('coins.total',lang)}:{coins}
              </Text>
              <Text category="s1" style={{ color: "white" }}>
              {translate('coins.steps',lang)}:{steps}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
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
    setCoinsLogs:item => dispatch(UserActions.setCoinsLogs(item)),
    setTodayCoins:item => dispatch(UserActions.setTodayCoins(item)),
    setCoins:item => dispatch(UserActions.setCoins(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent);

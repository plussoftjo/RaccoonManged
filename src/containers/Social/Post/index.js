import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Layout,
  Text,
  TopNavigationAction,
  TopNavigation,
  Icon,
  Input,
  Button,
} from "@ui-kitten/components";
import { connect } from "react-redux";

import { PostCard, Comments } from "./components";
import { apis } from "../../../services";
import { env,Models,colors } from '../../../constants'
import {UserActions} from '../../../stores'
import {translate} from '../../../translations'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
let Post = (props) => {
  let { post, profile } = props.social;
  let { user,socialTasks } = props.user;
  let {setSocialTasks,locale} = props;
  let {lang} = props.locale

  let [comment, setComment] = React.useState("");
  let [comments, setComments] = React.useState(post.comments);
  const BackIcon = (props) => <Icon {...props} name={locale.rtl ? 'arrow-forward':'arrow-back'} />;

  const BackAction = () => (
    <TopNavigationAction
      onPress={() => {
        props.navigation.goBack();
      }}
      icon={BackIcon}
    />
  );

  let _like = (post_id) => {
    apis.social.like(
      {
        posts_id: post_id,
        user_id: user.id,
      },
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.response);
      }
    );
  };
  let _unLike = (post_id) => {
    apis.social.unLike(
      {
        posts_id: post_id,
        user_id: user.id,
      },
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  const SendIcon = (props) => (
    <TouchableOpacity>
      <Icon name="message-square-outline" {...props} />
    </TouchableOpacity>
  );

  let _sendComment = () => {
    let data = {
      user_id: user.id,
      post_id: post.id,
      comment: comment,
    };
    apis.social.comment(
      data,
      (res) => {
        let _comments = comments;
        _comments.push(res);
        setComments(_comments);
        setComment("");
        
        let _socialTasks = {
          todayFollowPersion:socialTasks.todayFollowPersion,
          todayMakePost:socialTasks.todayMakePost,
          todayMakeComment:true
        }
        setSocialTasks(_socialTasks);
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  let _loadAds = async() => {
    // TODO: Change to not dev
    // Deploy: ca-app-pub-8749426160957410/5937621142
    // Test: ca-app-pub-3940256099942544/1033173712
    let _AdMobID = Platform.OS == 'android'? 'ca-app-pub-8749426160957410/5937621142':'ca-app-pub-8749426160957410/9210011114'
    await AdMobInterstitial.setAdUnitID(_AdMobID);
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
  }
  React.useEffect(() => {
    if(Platform.OS !== 'web') {
      _loadAds()
    }
  },[])

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title={translate('post.header',lang)} accessoryLeft={BackAction} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{flexGrow:1}}>
          <PostCard
            env={env}
            post={post}
            profile={profile}
            _like={_like}
            _unLike={_unLike}
            navigation={props.navigation}
            user_id={user.id}
            translate={translate}
            lang={lang}
          />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center",padding:15 }}>
              <View style={{ flex: 3,marginTop:5 }}>
                <Input
                  placeholder={translate('post.comment',lang)}
                  value={comment}
                  onChangeText={(val) => {
                    setComment(val);
                  }}
                  size="large"
                  textStyle={{textAlign:locale.rtl ?'right':'left'}}
                />
              </View>
              <View style={{width:10}}></View>
              <TouchableOpacity style={{padding:15,backgroundColor:colors.cottonCandy,borderRadius:3}} onPress={() => {_sendComment()}}>
                <Text style={{color:'white',fontWeight:'bold'}}>{translate('post.send',lang)}</Text> 
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderTopColor: "#787878",
              borderTopWidth: 1,
              paddingTop: 5,
            }}
          >
            {comments.map((trg, index) => (
              <Comments lang={lang} env={env} navigation={props.navigation} key={index} comment={trg} />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    social: state.social,
    locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSocialTasks:item => dispatch(UserActions.setSocialTasks(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

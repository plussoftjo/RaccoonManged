import React, { useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  Input,
  Icon,
  Tab,
  TabBar,
  Button,
  TopNavigationAction,
  useTheme
} from "@ui-kitten/components";
import { connect } from "react-redux";
//Component
import { PostCard, Search, SkeletonSpace,SearchResults } from "./components";

// Models
import { Models, env } from "../../../constants";
import { apis } from "../../../services";
import { SocialActions } from "../../../stores";
import { translate } from "../../../translations";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

let Social = (props) => {
  let { user, setExplorPosts, social, setPost, setProfile,locale } = props;
  let {lang} = props.locale

  // Ads Ids
  // TODO: Change 
  // Deploy: ca-app-pub-8749426160957410/7873519348
  // Dev: ca-app-pub-3940256099942544/6300978111
  let _AdMob = Platform.OS == 'android'?'ca-app-pub-8749426160957410/7873519348':'ca-app-pub-8749426160957410/9373662645'


  let theme = useTheme()
  // Constants

  let [selectedIndex, setSelectedIndex] = React.useState(0);

  let [followPosts, setFollowPosts] = React.useState([]);

  let [isLoading, setIsLoading] = React.useState(true);

  let _like = (post_id) => {
    apis.social.like(
      {
        posts_id: post_id,
        user_id: user.user.id,
      },
      (res) => {},
      (err) => {
        console.log(err.response);
      }
    );
  };
  let _unLike = (post_id) => {
    apis.social.unLike(
      {
        posts_id: post_id,
        user_id: user.user.id,
      },
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  let _pressPost = (post) => {
    setPost(post);
    setProfile(post.user);
    props.navigation.navigate("Post");
  };

  let renderItems = ({ item }) => {
    return (
      <PostCard
        navigation={props.navigation}
        env={env}
        _pressPost={_pressPost}
        _like={_like}
        _unLike={_unLike}
        post={item}
        user_id={user.user.id}
        translate={translate}
        lang={lang}
      />
    );
  };

  let ImageView = ({ data }) => (
    <TouchableOpacity
      onPress={() => {
        setPost(data);
        setProfile(data.user);
        props.navigation.navigate("Post");
      }}
      style={{ marginHorizontal: 3, marginTop: 7 }}
    >
      <Image
        source={{ uri: env.server + data.image }}
        style={{
          width: Models.window.width / 3.5,
          height: Models.window.width / 3.5,
          borderRadius: 5,
        }}
      />
    </TouchableOpacity>
  );

  let CameraIcon = (props) => <Icon name="camera-outline" {...props} />;

  
  useEffect(() => {
    let data = {
      user_id: user.user.id,
    };
    apis.social.index(
      data,
      (res) => {
        setExplorPosts(res.explorPosts);
        setFollowPosts(res.posts);
        setIsLoading(false);
      },
      (err) => {
        console.log(err.response);
        setIsLoading(false);
      }
    );
  }, []);

  const ProfileIcon = (props) => <Icon {...props} name="person" />;

  const ProfileAction = () => (
    <TopNavigationAction
      onPress={() => {
        props.navigation.navigate("Profile", { id: props.user.user.id });
      }}
      icon={ProfileIcon}
    />
  );
  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        title={translate("social.header")}
        accessoryRight={ProfileAction}
      />
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index);
        }}
      >
        <Tab title={translate("social.followers",lang)} />
        <Tab title={translate("social.explore",lang)} />
      </TabBar>
      <Search setSelectedIndex={setSelectedIndex} lang={lang} rtl={locale.rtl} />
      {Platform.OS !== 'web' &&
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={_AdMob} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={() => {console.log('error')}} />
      }
      
      {isLoading ? (
        <SkeletonSpace />
      ) : (
        <View id="HoleView" style={{ flex: 1 }}>
        <SearchResults navigation={props.navigation}/>
          {selectedIndex == 0 && followPosts.length !== 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={followPosts}
              renderItem={renderItems}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : null}
          {selectedIndex == 0 && followPosts.length == 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            <Icon name="alert-triangle-outline" style={{width:64,height:64}} fill={theme['text-hint-color']} />
              <Text category="s1" style={{ textAlign: "center",color:theme['text-hint-color'] }}>
                {translate("social.you_dont_follow",lang)}
              </Text>
            </View>
          ) : null}
          {selectedIndex == 1 && (
            <ScrollView
              contentContainerStyle={{ marginTop: 5, paddingHorizontal: 15 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {social.explorPosts.map((trg, index) => (
                  <ImageView key={index} data={trg} />
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      )}

      <View
        style={{ position: "absolute", right: 10, bottom: 10, zIndex: 103 }}
      >
        <Button
          onPress={() => {
            props.navigation.navigate("AddPost");
          }}
          accessoryLeft={CameraIcon}
          style={{ borderRadius: 30, width: 60, height: 60 }}
        ></Button>
      </View>
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
    setExplorPosts: (item) => dispatch(SocialActions.setExplorPosts(item)),
    setPost: (item) => dispatch(SocialActions.setPost(item)),
    setProfile: (item) => dispatch(SocialActions.setProfile(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Social);

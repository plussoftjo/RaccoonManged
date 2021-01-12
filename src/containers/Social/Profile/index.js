import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Button,
  useTheme,
  Input,
} from "@ui-kitten/components";
import { connect } from "react-redux";

import { SkeletonSpace } from "./components";

import { Models, env } from "../../../constants";
import { translate } from "../../../translations";

import { apis } from "../../../services";
import { SocialActions, UserActions } from "../../../stores";

let Profile = (props) => {
  let { user, route, navigation, setPost, setSocialTasks,locale } = props;
  let {lang} = props.locale
  let [profile, setProfile] = useState({ profile: { bio: "" } });
  let [profilePosts, setProfilePosts] = useState([]);
  let [owner, setOwner] = useState(false);
  let [isFollow, setIsFollow] = useState(false);
  let [counts, setCounts] = useState({
    follows: 0,
    followers: 0,
    posts: 0,
  });
  let [bio, setBio] = useState("");
  let [address, setAddress] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let profile_id = route.params.id;
    if (profile_id == user.user.id) {
      setProfile(user.user);
      setBio(user.user.profile.bio);
      setAddress(user.user.profile.address);
      setProfilePosts(user.posts);
      setOwner(true);
      setCounts({
        follows: user.counts.follows,
        followers: user.counts.followers,
        posts: user.posts.length,
      });
      setIsLoading(false);
    } else {
      apis.social.getProfile(
        profile_id,
        { user_id: user.user.id },
        (res) => {
          setProfile(res.profile);
          setProfilePosts(res.profile.posts);
          setIsFollow(res.isFollow);
          setOwner(false);
          setCounts({
            follows: res.follows,
            followers: res.followers,
            posts: res.profile.posts.length,
          });
          setIsLoading(false);
        },
        (err) => {
          console.log(err.response);
          setIsLoading(false);
        }
      );
    }
  }, []);

  const BackIcon = (props) => <Icon {...props} name={locale.rtl ?'arrow-forward':'arrow-back'} />;

  const BackAction = () => (
    <TopNavigationAction
      onPress={() => {
        navigation.goBack();
      }}
      icon={BackIcon}
    />
  );

  let GhostIcon = () => (
    <Icon
      name="arrow-ios-downward-outline"
      style={{ width: 25, height: 25 }}
      fill={theme["color-info-500"]}
    />
  );

  let ImageView = ({ data }) => (
    <TouchableOpacity
      onPress={() => {
        setPost(data);
        setProfile({
          id: profile.id,
          name: profile.name,
        });
        navigation.navigate("PostFromProfile");
      }}
      style={{ marginHorizontal: 3, marginTop: 7 }}
    >
      <Image
        source={{ uri:env.server + data.image }}
        style={{
          width: Models.window.width / 3.5,
          height: Models.window.width / 3.5,
          borderRadius: 5,
        }}
      />
    </TouchableOpacity>
  );

  let _follow = () => {
    apis.social.follow(
      {
        user_id: user.user.id,
        follow_id: profile.id,
      },
      (res) => {
        console.log(res);
        setIsFollow(true);
        let socialTasks = {
          todayFollowPersion: true,
          todayMakePost: user.socialTasks.todayMakePost,
          todayMakeComment: user.socialTasks.todayMakeComment,
        };

        setSocialTasks(socialTasks);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  let _unFollow = () => {
    apis.social.unFollow(
      {
        user_id: user.user.id,
        follow_id: profile.id,
      },
      (res) => {
        console.log(res);
        setIsFollow(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  let _updateBio = () => {
    let _data = {
      bio: bio,
      user_id: profile.id,
    };
    apis.user.updateBio(
      _data,
      (res) => {
        console.log("Update");
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  let _updateAddress = () => {
    let _data = {
      address: address,
      user_id: profile.id,
    };
    apis.user.updateAddress(
      _data,
      (res) => {
        console.log("Update");
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  let theme = useTheme();
  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title={profile.name} accessoryLeft={BackAction} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <SkeletonSpace />
        ) : (
          <View style={{ marginTop: 10, padding: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: env.server + profile.avatar }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "#7e7e7e",
                  }}
                />
              </View>
              <View style={{ flex: 2, justifyContent: "center" }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View
                    style={{ justifyContent: "center", marginHorizontal: 4 }}
                  >
                    <Text category="h5" style={{ textAlign: "center" }}>
                      {counts.posts}
                    </Text>
                    <Text
                      category="s1"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      {translate("profile.posts",lang)}
                    </Text>
                  </View>
                  <View
                    style={{ justifyContent: "center", marginHorizontal: 4 }}
                  >
                    <Text category="h5" style={{ textAlign: "center" }}>
                      {counts.followers}
                    </Text>
                    <Text
                      category="s1"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      {translate("profile.followers",lang)}
                    </Text>
                  </View>
                  <View
                    style={{ justifyContent: "center", marginHorizontal: 4 }}
                  >
                    <Text category="h5" style={{ textAlign: "center" }}>
                      {counts.follows}
                    </Text>
                    <Text
                      category="s1"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      {translate("profile.following",lang)}
                    </Text>
                  </View>
                </View>
                {!owner && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    {isFollow && (
                      <Button
                        status="info"
                        appearance="outline"
                        style={{ borderRadius: 30 }}
                        onPress={() => {
                          _unFollow();
                        }}
                      >
                        {translate("profile.following",lang)}
                      </Button>
                    )}
                    {!isFollow && (
                      <Button
                        status="info"
                        style={{ borderRadius: 30 }}
                        onPress={() => {
                          _follow();
                        }}
                      >
                        {translate("profile.follow",lang)}
                      </Button>
                    )}

                    <Button
                      status="info"
                      appearance="outline"
                      size="small"
                      style={{ borderRadius: 30, marginHorizontal: 5 }}
                      accessoryLeft={GhostIcon}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text category="h5" style={{textAlign:'left'}}>{profile.name}</Text>
              {profile.profile && (
                <>
                  {!owner && <Text category="s1" style={{textAlign:'left'}}>{profile.profile.bio}</Text>}
                </>
              )}

              {owner && (
                <Input
                  value={bio}
                  onChangeText={(val) => {
                    setBio(val);
                  }}
                  placeholder={translate("profile.bio",lang)}
                  label={translate("profile.bio",lang)}
                  multiline={true}
                  textStyle={{ minHeight: 62 }}
                  onBlur={_updateBio}
                />
              )}
              {owner && (
                <Input
                  value={address}
                  onChangeText={(val) => {
                    setAddress(val);
                  }}
                  placeholder={translate("profile.address",lang)}
                  label={translate("profile.address",lang)}
                  onBlur={_updateAddress}
                />
              )}
            </View>
          </View>
        )}
        {!isLoading && (
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {profilePosts.map((trg, index) => (
                <ImageView key={index} data={trg} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
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
  return {
    setPost: (item) => dispatch(SocialActions.setPost(item)),
    setProfile: (item) => dispatch(SocialActions.setProfile(item)),
    setSocialTasks: (item) => dispatch(UserActions.setSocialTasks(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

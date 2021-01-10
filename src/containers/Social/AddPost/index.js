import React, { useState, useEffect } from "react";
import { View, Platform, Image, ScrollView } from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import { apis } from "../../../services";
import { env } from "../../../constants";
import { UserActions } from "../../../stores";
import { translate } from "../../../translations";

let AddPost = (props) => {
  let { user, posts, socialTasks } = props.user;
  let { setPosts, setSocialTasks,locale } = props;
  const BackIcon = (props) => <Icon {...props} name={locale.rtl ? "arrow-forward":'arrow-back'} />;

  const BackAction = () => (
    <TopNavigationAction
      onPress={() => {
        props.navigation.goBack();
      }}
      icon={BackIcon}
    />
  );

  const CameraButton = (props) => <Icon name="camera" {...props} />;

  let [image, setImage] = useState(null);
  let [body, setBody] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  let store = () => {
    let uriArray = image.split(".");
    let fileType = uriArray[uriArray.length - 1];
    let formData = new FormData();
    formData.append("image", {
      uri: image,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("body", body);
    formData.append("user_id", user.id);
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    fetch(env.server + "api/social/addpost", options)
      .then((response) => response.json())
      .then((json) => {
        let _posts = posts;
        _posts.push(json);
        setPosts(_posts);
        let _socialTasks = {
          todayFollowPersion: socialTasks.todayFollowPersion,
          todayMakePost: true,
          todayMakeComment: socialTasks.todayMakeComment,
        };
        setSocialTasks(_socialTasks);
        props.navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        title={translate("make_post.header")}
        accessoryLeft={BackAction}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ padding: 15, marginTop: 10 }}>
          <Input
            value={body}
            onChangeText={(val) => setBody(val)}
            label={translate('make_post.post')}
            multiline={true}
            textStyle={{ minHeight: 84 }}
          />
          <Button onPress={pickImage} accessoryLeft={CameraButton}>
          {translate('make_post.add_image')}
          </Button>
        </View>

        <View style={{ padding: 15 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 200, borderRadius: 15 }}
            />
          )}
        </View>
      </ScrollView>
      <View style={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}>
        <Button
          onPress={() => {
            store();
          }}
          status="info"
        >
          {translate('make_post.add_post')}
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
  return {
    setPosts: (item) => dispatch(UserActions.setPosts(item)),
    setSocialTasks: (item) => dispatch(UserActions.setSocialTasks(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);

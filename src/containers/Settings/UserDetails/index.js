import React,{useState} from "react";
import { View, ScrollView, Image, Pressable } from "react-native";
import { Layout, Text, Input, Button, Icon } from "@ui-kitten/components";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// Global Components
import { GradientSpace, ContentCard } from "../../../components";

// Constats
import { env } from "../../../constants";

// Local Components
import { Header } from "./components";

// styles
import styles from "./styles";

import { apis } from "../../../services";
import {UserActions} from '../../../stores'
import {translate} from '../../../translations'

let UserDetails = (props) => {
  let { navigation,setUser,locale } = props;
  let { user } = props.user;
  let [image, setImage] = useState(null);
  let [data, setData] = React.useState({
    name: user.name,
    phone: user.phone.toString(),
    password: "",
    user_id: user.id,
  });

  let pickup_image = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      _changeAvatar(result.uri);
    }
  };

  let _changeAvatar = (uri) => {
    let formData = new FormData();
    let uriArray = uri.split(".");
    let fileType = uriArray[uriArray.length - 1];
    formData.append("image", {
      uri: uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("user_id", data.user_id);
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    fetch(env.server + "api/user/updateAvatar", options)
      .then((response) => response.json())
      .then(async (json) => {
        setUser(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let save = () => {
    apis.user.updateProfile(
      data,
      (res) => {
        console.log(res);
        alert(translate('user_details.update_profile_success'));
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;
  return (
    <Layout style={styles.container}>
      <GradientSpace />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header navigation={navigation} rtl={locale.rtl} title={translate('user_details.header')} />
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingVertical: 10,
          }}
          onPress={() => {
            pickup_image();
          }}
        >
          <Image
            source={{ uri: env.server + user.avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              borderColor: "#7e7e7e",
              borderWidth: 1,
            }}
          />
        </Pressable>
        <ContentCard>
          <View id="Group">
            <Input
              name={translate('user_details.user_name')}
              label={translate('user_details.user_name')}
              value={data.name}
              onChangeText={(val) => setData({ ...data, name: val })}
            />
            <View style={{ marginTop: 5 }}></View>
            <Input
              name={translate('user_details.phone')}
              label={translate('user_details.phone')}
              value={data.phone}
              onChangeText={(val) => setData({ ...data, phone: val })}
            />
            <View style={{ marginTop: 5 }}></View>
            <Input
              name={translate('user_details.password')}
              label={translate('user_details.password')}
              caption={translate('user_details.keep_password')}
              captionIcon={AlertIcon}
              secureTextEntry={true}
              value={data.password}
              onChangeText={(val) => setData({ ...data, password: val })}
            />
            <View style={{ marginTop: 15 }}></View>
            <Button
              status="success"
              onPress={() => {
                save();
              }}
            >
              {translate('user_details.save')}
            </Button>
          </View>
        </ContentCard>
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
    setUser:item => dispatch(UserActions.setUser(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

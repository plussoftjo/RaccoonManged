import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import {
  Layout,
  Text,
  Input,
  Button,
  useTheme,
  Spinner,
  Icon
} from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

// Stores
import { connect } from "react-redux";
import { UserActions } from "../../stores";

// Services
import { apis } from "../../services";
import { translate } from "../../translations";

// Components
import { Header } from "./components";
import { Toast } from "../../components";

// Constants
import { StorageToken, env } from "../../constants";

// Models
import Models from "./models";

let Auth = (props) => {
  /**
   * @theme {Component theme} Theme
   * @model {The currect model} Models
   * @left {Left animation value} AnimatedValue
   * @fade {Fade animation value} AnimatedValue
   * @_timeInteger {Animated Duration} integer
   * @data {name:user name,phone:user phone,password:secret password} object
   * */
  let theme = useTheme();
  let [model, setModel] = useState(Models.login);
  let left = useRef(new Animated.Value(-1000)).current;
  let fade = useRef(new Animated.Value(0)).current;
  let _timeInteger = 500;
  let [data, setData] = useState({
    name: "",
    phone: "",
    password: "",
    role_id: 1,
    referral_code:""
  });
  let { navigation, setUser } = props;
  let [image, setImage] = useState(null);
  let [isload, setIsLoad] = useState(false);
  let [error, setError] = useState(null);
  /**
   *
   *
   * @AnimationHandler {Hand the animate}
   * @useEffect {Fire Up Methods}
   * @changeModel {Fire Up Methods}
   */
  let AnimationHandler = (type) => {
    // @type => Type of animation is doing the animation or back from it
    switch (type) {
      case "do":
        // Animate Lef
        Animated.timing(left, {
          toValue: 0,
          duration: _timeInteger,
          useNativeDriver: true,
        }).start();
        // Animate fade
        Animated.timing(fade, {
          toValue: 1,
          duration: _timeInteger,
          useNativeDriver: true,
        }).start();
        break;
      case "back":
        //Animated left
        Animated.timing(left, {
          toValue: -1000,
          duration: _timeInteger,
          useNativeDriver: true,
        }).start();
        // Animated fade
        Animated.timing(fade, {
          toValue: 0,
          duration: _timeInteger,
          useNativeDriver: true,
        }).start();
        break;
      default:
        break;
    }
  };

  let _login = () => {
    setIsLoad(true);
    apis.user.login(
      data,
      async (res) => {
        setIsLoad(false);
        await AsyncStorage.setItem(StorageToken.userToken, res.token);
        setUser(res.user);
        navigation.navigate("MainNavigatin");
      },
      (err) => {
        console.log(err.response);
        setError("Please check Phone/Password");
        setTimeout(() => {
          setError(null);
        }, 3000);
        setIsLoad(false);
      }
    );
  };

  let _register = () => {
    setIsLoad(true);
    let formData = new FormData();
    if (image !== null) {
      let uriArray = image.split(".");
      let fileType = uriArray[uriArray.length - 1];
      formData.append("image", {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    } else {
      formData.append("image", "null");
    }
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("role_id", data.role_id);
    formData.append("referral_code", data.referral_code);
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    fetch(env.server + "api/user/register", options)
      .then((response) => response.json())
      .then(async (json) => {
        console.log(json);
        if (json.token == null) {
          setIsLoad(false);
          setError("Please Complete Field");
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }else {
          await AsyncStorage.setItem(StorageToken.userToken, json.token);
          setUser(json.user);
          setIsLoad(false);
          navigation.navigate("MainNavigatin");
        }
        
      })
      .catch((error) => {
        console.error(error);
        setIsLoad(false);
      });
  };

  const LoadingIndicator = (props) => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Spinner status="basic" size="small" />
    </View>
  );

  const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;
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
    }
  };

  useEffect(() => {
    AnimationHandler("do");
  }, []);

  let changeModel = () => {
    switch (model.header) {
      case "Login":
        AnimationHandler("back");
        setTimeout(() => {
          setModel(Models.register);
          AnimationHandler("do");
        }, _timeInteger + 100);
        break;
      case "Register":
        AnimationHandler("back");
        setTimeout(() => {
          setModel(Models.login);
          AnimationHandler("do");
        }, _timeInteger + 100);
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      {/* Headers Space With Positions */}
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: Models.header.svgHeight,
          width: Models.header.width,
        }}
      >
        <Header />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        {/* Content */}
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                paddingTop: "5%",
                paddingHorizontal: 10,
                transform: [{ translateX: left }],
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 48,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {model.header}
              </Text>
            </Animated.View>
            {model.header == "Register" && (
              <Animated.View
                style={{
                  paddingTop: 10,
                  transform: [{ translateX: left }],
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onPress={pickup_image}
                >
                  {!image ? (
                    <Image
                      source={require("../../assets/user/avatar.png")}
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                  ) : (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>
            )}
            <Animated.View
              style={{
                paddingTop: "2%",
                paddingHorizontal: "10%",
                opacity: fade,
                flex: 1,
              }}
            >
              {model.header == "Register" && (
                <Input
                  placeholder="Name"
                  value={data.name}
                  onChangeText={(val) => setData({ ...data, name: val })}
                  style={{ borderRadius: 20, marginTop: 5 }}
                />
              )}
              <Input
                placeholder="Phone"
                value={data.phone}
                keyboardType={"number-pad"}
                onChangeText={(val) => setData({ ...data, phone: val })}
                style={{ borderRadius: 20, marginTop: 5 }}
              />
              <Input
                placeholder="Password"
                value={data.password}
                onChangeText={(val) => setData({ ...data, password: val })}
                secureTextEntry={true}
                style={{ borderRadius: 20, marginTop: 5 }}
              />
              {/* {model.header == "Register" && (
                <Input
                placeholder="Referral code"
                value={data.referral_code}
                caption={'Insert the code from the friend if you have.'}
                captionIcon={AlertIcon}
                onChangeText={(val) => setData({ ...data, referral_code: val })}
                style={{ borderRadius: 20, marginTop: 5 }}
                keyboardType="number-pad"
                />
              )} */}
              
            </Animated.View>
          </View>
        </View>
      </ScrollView>
      <Animated.View
        style={{
          paddingTop: "25%",
          flex: 1,
          justifyContent: "center",
          position: "absolute",
          left: 0,
          bottom: 30,
          width: "100%",
          alignItems: "center",
          transform: [{ translateX: left }],
        }}
      >
        <Button
          style={{ width: "80%", borderRadius: 20 }}
          onPress={() => {
            if (model.header == "Login") {
              _login();
            } else {
              _register();
            }
          }}
          accessoryLeft={isload ? LoadingIndicator : null}
        >
          {isload ? "Loading" : model.header}
        </Button>
        <View
          style={{
            paddingTop: "10%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "500" }}>{model.last[0]}</Text>
          <TouchableOpacity
            onPress={() => {
              changeModel();
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: theme["color-success-900"] }}
            >
              {" "}
              {model.last[1]}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {error && <Toast status="danger" title={error} />}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

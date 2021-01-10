import React, { useState, useEffect, useRef } from "react";
import { View, Image, TouchableOpacity, Animated } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons, Entypo } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
// stores
import { connect } from "react-redux";

// constants
import { colors, StorageToken } from "../../constants";

// Models
import Models from "./models";

let Steps = (props) => {
  /**
   * Constants
   * @theme {Use Theme} Theme
   * @integer {inx:Set page index} integer
   * @left {Animatied Left Translate} AnimatedValue
   * @fade {OpacityAnimation fade} AnimatedValue
   * @_timeInteger {Time duration for animation} integer
   * */

  let { navigation } = props;
  // Theme
  let theme = useTheme();
  // Page
  let [inx, setInx] = useState(0);
  // Animation
  const left = useRef(new Animated.Value(-1000)).current;
  const fade = useRef(new Animated.Value(0)).current;
  let _timeInteger = 500;

  /**
   *
   *
   * @AnimationHandler {Handle animation for left,fade => with 'do','back'}
   * @changeStep {Change Step for the page}
   * @useEffect {Use Effect for do in fire up}
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

  let changeSteps = async (step) => {
    // TODO: Check index page and make auth navigate

    if (step == 3) {
      // If Last Step
      await AsyncStorage.setItem(StorageToken.firstTime,'Checked');
      navigation.navigate('Auth');
      return;
    }
    // Do the animation back
    AnimationHandler("back");

    // Hold _timeinteger + 100
    setTimeout(() => {
      // Set new index for the page
      setInx(step);
      // Animate Handler do
      AnimationHandler("do");
    }, _timeInteger + 100);
  };

  useEffect(() => {
    AnimationHandler("do");
  }, []);

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <LinearGradient
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
        colors={[colors.mauve4, colors.celeste]}
      >
        <Animated.View style={{ transform: [{ translateX: left }] }}>
          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <Text style={{ color: "white", textAlign: "left", fontSize: 48 }}>
              {Models[inx].title}
            </Text>
            <Text
              style={{ color: "white", fontSize: 32, paddingHorizontal: 30 }}
            >
              {Models[inx].secoundTitle}
            </Text>
          </View>
          <View
            style={{ width: "100%", paddingHorizontal: 20, paddingTop: 35 }}
          >
            <Text style={{ color: "white" }} category="h5">
              {Models[inx].content}
            </Text>
          </View>
        </Animated.View>

        <View
          style={{ paddingTop: "20%", width: "100%", paddingHorizontal: 20 }}
        >
          <Animated.Image
            source={Models[inx].image}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              transform: [{ translateX: left }],
            }}
          />
        </View>
        <Animated.View
          style={{
            marginTop: "20%",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            opacity: fade,
          }}
        >
          <View style={{ position: "absolute", left: 20, top: -5 }}>
            <Text category="h5" style={{ color: "white" }}>
              Skip
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Models.map((trg, index) => (
                <Entypo
                  key={index}
                  name="circle"
                  color={inx == index ? theme["color-success-500"] : "white"}
                  size={18}
                  style={{ marginHorizontal: 2 }}
                />
              ))}
            </View>
          </View>
        </Animated.View>
        <View
          style={{
            position: "absolute",
            right: -50,
            top: "55%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              changeSteps(inx + 1);
            }}
            style={{
              backgroundColor: "white",
              padding: 25,
              borderRadius: 50,
              paddingHorizontal: 60,
            }}
          >
            <Octicons name="arrow-right" color="black" size={46} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Steps);

import React,{useState,useEffect} from "react";
import { View, Image, ScrollView } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";

// Components
import {  HeaderContent } from "./components";
// GlobalComponents
import {  ContentCard,GradientSpace,Toast } from "../../../components";

import {translate} from '../../../translations'

// Tasks Getter
import {StepsTask,SocialTask} from './Tasks'

// Styles
import styles from "./styles";

let Coins = (props) => {
  
  let { user,locale } = props;
  let [scrollY,setScrollY] = useState(0);
  let [showToast,setShowToast] = useState(false)

  let _scrollEvent = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    setScrollY(y);
  }
  return (
    <Layout style={styles.container}>
      <GradientSpace />
      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} onScroll={_scrollEvent}>
        <HeaderContent scrollY={scrollY} rtl={locale.rtl} navigation={props.navigation} setShowToast={setShowToast} />
        {/* Content Bottom Start */}
        <ContentCard>
          <StepsTask setShowToast={setShowToast} />
          <View style={{marginTop:15}}></View>
          <SocialTask setShowToast={setShowToast} />
        </ContentCard>
      </ScrollView>
      {showToast &&
        <Toast status="primary" title={translate('coins.add_coins_success')} />
      }
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);

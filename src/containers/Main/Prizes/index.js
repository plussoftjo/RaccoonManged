import React from "react";
import { View, Image, ScrollView } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";

// Components
import { HeaderContent, PrizeCard } from "./components";

// Global Components
import { Headers, ContentCard,GradientSpace } from "../../../components";

//translations
import {translate} from '../../../translations'

// Styles
import styles from './styles'

// Stores
import {PrizesActions} from '../../../stores'

let Prizes = (props) => {
  let {user,coins} = props.user;
  let {prizes,navigation,setSelectedCategory,dev} = props;
  let {lang,rtl} = props.locale
  

  let onPressCategory = (category) => {
    setSelectedCategory(category)
    navigation.navigate("ShowPrizesCategories");
  }
  return (
    <Layout style={{ flex: 1 }}>
    <GradientSpace></GradientSpace>
    <ScrollView showsVerticalScrollIndicator={false}>
    <HeaderContent dev={dev} lang={lang} user={user} coins={coins} />
    <View style={{height:30}}></View>
      <ContentCard>
        <View style={styles.container}>
          <Text category="h3" style={{textAlign:'left'}}>{translate('prizes.digital_card',lang)}</Text>
        </View>
        <View style={styles.contentCard}>
        {prizes.prizesCategories.map((trg,index) => (
          <PrizeCard key={index} onPressCategory={onPressCategory} category={trg} />
        ))}
        </View>
      </ContentCard>
    </ScrollView>
      
    </Layout>
  );
};



const mapStateToProps = (state) => {
  return {
    user:state.user,
    prizes:state.prizes,
    locale:state.settings.locale,
    dev:state.settings.dev
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCategory:item => dispatch(PrizesActions.setSelectedCategory(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prizes);

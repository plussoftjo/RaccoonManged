import React,{useEffect,useState} from "react";
import { View, Image, ScrollView, StyleSheet,Platform } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import { Octicons, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pedometer } from 'expo-sensors';
// Components
import { HeaderContent, DetailsBox,Steps } from "./components";

// Global Components
import { Headers,GradientSpace } from "../../../components";
import { StorageToken,Images } from "../../../constants";

// Stores
import { connect } from "react-redux";
import {UserActions} from '../../../stores'

// styles
import styles from './styles'

import {translate} from '../../../translations'


let Home = (props) => {

  
  let {settings,user,setSteps} = props;
  let {lang,rtl} = props.settings.locale


  let _getSteps = () => {
    const end = new Date();
    const start = new Date();
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);
    
    
    function getStep() {
      Pedometer.getStepCountAsync(start, end).then(
        result => {
          setSteps(result.steps);
          Pedometer.watchStepCount(watchRes => {
            let _newSteps = watchRes.steps;
            let _oldSteps = result.steps;
            let _sumSteps = _newSteps + _oldSteps;
            setSteps(_sumSteps)
          });
          },
          error => {
            console.log(error)
          }
        );

        
       
    }
    Pedometer.isAvailableAsync().then(
      result => {
        getStep()
      },
      error => {
        console.log(error)
      }
    );
    
    
  }

  useEffect(() => {
    // Call Get Steps
    if(Platform.OS == 'ios') {
      _getSteps();
    }
    
  },[])

  return (
    <Layout style={styles.container}>
    <GradientSpace />
        <HeaderContent lang={lang} user={user.user} navigation={props.navigation}/>
      <ScrollView id="ContentCard" showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentCard}>
        <View style={styles.totalContentCard}>
          <Text style={styles.centerText} category="h1">
            {translate('main.total_coins',lang)}
          </Text>
          <Text style={styles.centerText} category="h5">
            {user.coins}
          </Text>
          <Button style={styles.goButton} onPress={async() => {
            props.navigation.navigate('Coins')
          }}>GO</Button>
        </View>
        <Text category="h3" style={{textAlign:'left'}}>{translate('main.today',lang)}</Text>
        <View style={styles.detailsCard}>
          <DetailsBox title={translate('main.steps',lang)} color={'#ffebee'} image={Images.Steps} value={user.steps} />
          <DetailsBox title={translate('main.coins',lang)} color={'#ede7f6'} image={Images.Coins} value={user.todayCoins} />
          <DetailsBox title={translate('main.task_done',lang)} color={'#fff9c4'} image={Images.Tasks} value={user.coinsLogs.length} />
        </View>
      </ScrollView>
      {Platform.OS == 'android' &&
        <Steps />
      }
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    settings:state.settings,
    user:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSteps:item => dispatch(UserActions.setSteps(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

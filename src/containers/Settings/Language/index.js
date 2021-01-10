import React from 'react';
import {View,TouchableOpacity,ScrollView} from 'react-native'
import {Layout,Text,CheckBox} from '@ui-kitten/components'
import {changeLanguage,translate} from '../../../translations'
import { connect } from 'react-redux';

// Global Components
import {GradientSpace,ContentCard} from '../../../components'


// Local Components
import {HeaderContent} from './components'

let Orders = (props) => {

    let {navigation} = props;
    let [inx,setInx] = React.useState(0);


    React.useEffect(() => {
        let lang = props.locale.lang;

        if(lang == 'en') {
            setInx(0);
        } else if(lang == 'ar') {
            setInx(1);
        }
    },[])
     return(
         <Layout style={{flex:1}}>
            <GradientSpace />
            <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
                <HeaderContent navigation={navigation} title={translate('languages.header')} rtl={props.locale.rtl} title={translate('languages.header')} />
                <View style={{paddingTop:15}}></View>
                <ContentCard >
                    <Text category="s1" style={{textAlign:'left'}}>{translate('languages.select_your_language')}</Text>
                    <TouchableOpacity
            onPress={() => {
              // change Language
              // Check if not the same language
              if (inx !== 0) {
                changeLanguage("en", false);
              }
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderBottomColor: "#7e7e7e",
              borderBottomWidth: 0.5,
            }}
          >
            <CheckBox status="success" checked={inx == 0 ? true : false} />
            <View style={{ width: 15 }}></View>
            <Text category="h5">English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // change Language
              // Check if not the same language
              if (inx !== 1) {
                changeLanguage("ar", true);
              }
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderBottomColor: "#7e7e7e",
              borderBottomWidth: 0.5,
            }}
          >
            <CheckBox status="success" checked={inx == 1 ? true : false} />
            <View style={{ width: 15 }}></View>
            <Text category="h5">العربية</Text>
          </TouchableOpacity>
                </ContentCard>
            </ScrollView>
         </Layout>
     )
}


const mapStateToProps = (state) => {
     return {
         user:state.user,
         locale:state.settings.locale
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
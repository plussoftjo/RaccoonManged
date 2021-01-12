import React from 'react';
import { View,ScrollView } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';

// Global Components
import {GradientSpace,ContentCard} from '../../../components'
import {translate} from '../../../translations'

// Local Components
import {HeaderContent} from './components'

let CoinsLogs = (props) => {

    let {coinsLogs} = props.user
    let {navigation,locale} = props;
    let {lang,rtl} = locale

    let CardList = ({title,value}) => (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomColor:'#7e7e7e',borderBottomWidth:0.5,paddingVertical:5}}>
            <View>
                <Text category="s1">{title}</Text>
            </View>
            <View>
                <Text category="s1">{value}</Text>
            </View>
        </View>
    )
    let LogsCard = ({log}) => (
        <View style={{padding:15,marginVertical:10,borderColor:'#7e7e7e',borderWidth:1,borderRadius:5}}>
            <CardList  title={'#' + translate('coins_logs.id',lang)} value={'#' + log.id}></CardList>
            <CardList  title={'#' + translate('coins_logs.coin',lang)} value={'+' +log.coin}></CardList>
            <CardList  title={'#' + translate('coins_logs.type',lang)} value={log.way}></CardList>
            <CardList  title={'#' + translate('coins_logs.date',lang)} value={log.created_at}></CardList>
        </View>
    )
     return(
         <Layout style={{flex:1}}>
            <GradientSpace />
            <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
                <HeaderContent rtl={locale.rtl} navigation={navigation} title={translate('coins_logs.header',lang)} />
                <View style={{paddingTop:15}}></View>
                <ContentCard >
                <Text category="s1" style={{textAlign:'left'}}>{translate('coins_logs.preview_today_coins_logs',lang)}</Text>
                {coinsLogs.map((trg,index) => (
                    <LogsCard key={index} log={trg} />
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(CoinsLogs);
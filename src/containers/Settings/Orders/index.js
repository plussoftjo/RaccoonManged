import React from 'react';
import { View,ScrollView } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';

// Global Components
import {GradientSpace,ContentCard} from '../../../components'
import {translate} from '../../../translations'

// Local Components
import {HeaderContent} from './components'

let Orders = (props) => {

    let {orders} = props.user
    let {navigation,locale} = props;
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
    let OrderCard = ({order}) => (
        <View style={{padding:15,marginVertical:10,borderColor:'#7e7e7e',borderWidth:1,borderRadius:5}}>
            <CardList  title={'#' + translate('my_orders.id')} value={'#' + order.id}></CardList>
            <CardList  title={'#' + translate('my_orders.category')} value={order.prizes_categories.title}></CardList>
            <CardList  title={'#' + translate('my_orders.type')} value={order.prizes_sub_categories.title}></CardList>
            <CardList  title={'#' + translate('my_orders.fee')} value={order.fee}></CardList>
            <CardList  title={'#' + translate('my_orders.code')} value={order.codes.code}></CardList>
            <CardList  title={'#' + translate('my_orders.date')} value={order.created_at}></CardList>
        </View>
    )
     return(
         <Layout style={{flex:1}}>
            <GradientSpace />
            <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
                <HeaderContent rtl={locale.rtl} navigation={navigation} title={translate('my_orders.header')} />
                <View style={{paddingTop:15}}></View>
                <ContentCard >
                {orders.map((trg,index) => (
                    <OrderCard key={index} order={trg} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
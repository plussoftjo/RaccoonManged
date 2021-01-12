import React from 'react';
import { View,ScrollView,Image,Pressable } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';

// Global Components
import {GradientSpace,ContentCard} from '../../../components'

import {env} from '../../../constants'

//Stores
import  {PrizesActions} from '../../../stores'
import  {translate} from '../../../translations'

// LocalComponents
import {HeaderContent} from './components'


let ShowPrizesCategories = (props) => {
    let {selectedCategory} = props.prizes;
    let {navigation,setSelectedSubCategory} = props;
    let {rtl,lang} = props.locale;
    
    let onPressSubCategory = (subCategory) => {
        setSelectedSubCategory(subCategory);
        navigation.navigate('Checkout')
    }

    let PrizesSubCategoriesCard = ({SubCategory}) => {
        return(
            <Pressable onPress={() => {
                onPressSubCategory(SubCategory)
            }} style={{width:'45%',padding:10}}>
                <Image source={{uri:env.server + 'storage/' + SubCategory.image}} style={{width:'100%',height:75}} resizeMode="contain" />
                <Text category="s1" style={{textAlign:'center',paddingTop:10}}>{SubCategory.title}</Text>
            </Pressable>
        )
    }
     return(
         <Layout style={{flex:1}}>
            <GradientSpace />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
                <HeaderContent navigation={navigation} rtl={rtl} title={selectedCategory.title} />
                <View style={{padding:25,paddingTop:10}}>
                    <Image source={{uri:env.server + 'storage/' + selectedCategory.image}} style={{width:'100%',height:180,borderRadius:5}} resizeMode="stretch" />
                    <Text style={{paddingTop:10,color:'white',fontSize:16,fontWeight:'500'}}>{selectedCategory.description}</Text>
                </View>
                <ContentCard >
                <Text category="s1" style={{textAlign:'left',marginBottom:10}}>{translate('prizes_categories_show.select_card',lang)}</Text>
                    {selectedCategory.prizes_sub_categories.map((trg,index) => (
                        <PrizesSubCategoriesCard key={index} SubCategory={trg} />
                    ))}
                </ContentCard>
            </ScrollView>
         </Layout>
     )
}


const mapStateToProps = (state) => {
     return {
         prizes:state.prizes,
         locale:state.settings.locale
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setSelectedSubCategory:item => dispatch(PrizesActions.setSelectedSubCategory(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPrizesCategories);
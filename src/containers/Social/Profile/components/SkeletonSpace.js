import React from 'react';
import {View,} from 'react-native';
import SkeletonContent from "react-native-skeleton-content";


export default () => {
     return (
        <View id="SkeletonSpace">
            <SkeletonContent 
                containerStyle={{flexDirection:'row',alignItems:'center',paddingHorizontal:10}}
                isLoading={true}
                layout={[
                    {key:'Image',height:100,width:100,borderRadius:50,},
                    {key:'ImageContent',width:'60%',height:50,borderRadius:5,marginHorizontal:5}
                ]}
            />
            <SkeletonContent 
                containerStyle={{width:'100%',marginVertical:5,paddingHorizontal:10}}
                isLoading={true}
                layout={[
                    {key:'Image',height:100,width:'100%',borderRadius:5,},
                ]}
            />
            <SkeletonContent 
                containerStyle={{flexDirection:'row',alignItems:'center',marginTop:10,flexWrap:'wrap',justifyContent:'center'}}
                isLoading={true}
                layout={[
                    {key:'Post1',height:100,width:'30.33333%',borderRadius:5,marginHorizontal:3,marginTop:5},
                    {key:'Post2',height:100,width:'30.33333%',borderRadius:5,marginHorizontal:3,marginTop:5},
                    {key:'Post3',height:100,width:'30.33333%',borderRadius:5,marginHorizontal:3,marginTop:5},
                    {key:'Post4',height:100,width:'30.33333%',borderRadius:5,marginHorizontal:3,marginTop:5},
                    {key:'Post5',height:100,width:'30.33333%',borderRadius:5,marginHorizontal:3,marginTop:5},
                    {key:'Post6',height:100,width:'30.33333%',borderRadius:5,marginHorizontal:3,marginTop:5},
                ]}
            />
        </View>
     )
}
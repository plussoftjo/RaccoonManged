import React from 'react';
import { View,Image,TouchableOpacity } from 'react-native';
import { Layout,Text,TopNavigation,Input,Icon,useTheme } from '@ui-kitten/components';



export interface Profile {
    id:number,
    bio:string
}
export interface User {
    name:string,
    id:number,
    profile:Profile,
    avatar:string
}

export interface Comment {
    user_id:number,
    post_id:number,
    comment:string,
    user:User,
}

export interface Env{
    server:string,
    dev:boolean
}

export interface Props {
    comment:Comment,
    navigation:any,
    env:Env
}
const PostCard: React.FC<Props> = (props) => {
     let theme = useTheme();
    return (
        <View style={{marginTop:10,padding:10,borderBottomColor:'#7e7e7e',borderBottomWidth:1,marginRight:25,marginLeft:5}}>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('Profile',{id:props.comment.user.id})
            }} style={{flexDirection:'row',alignItems:'flex-end'}}>
                <Image style={{width:30,height:30,borderRadius:15}} source={{uri:props.env.server + props.comment.user.avatar}} />
                <View style={{width:5}} />
                <Text category="s1" style={{textAlign:'left'}}>{props.comment.user.name}</Text>
            </TouchableOpacity>
            <Text category="s2" style={{paddingTop:5,textAlign: 'left'}}>{props.comment.comment}</Text>
        </View>
    );
}

export default PostCard;
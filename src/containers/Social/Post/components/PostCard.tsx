import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Layout, Text, TopNavigation, Input, Icon, useTheme } from '@ui-kitten/components';


export interface Profile {
     address:string
}
export interface User {
     id: number,
     name: string,
     avatar: string,
     profile:Profile
}

export interface Likes {
     user_id: number,
     posts_id: number
}
export interface Post {
     body: string,
     id: number,
     user: User,
     image: string,
     created_at: string,
     likes: Likes[]
}

export interface Env {
     server: string,
     dev: boolean
}
export interface Props {
     title: string
     coins: number,
     done: boolean,
     post: Post,
     navigation: any,
     profile: User,
     user_id: number,
     _like: any,
     _unLike: any,
     env: Env,
     translate: any,
     lang:string
}
const PostCard: React.FC<Props> = (props) => {
     let theme = useTheme();
     let [isLike, setIsLike] = React.useState(false);
     let [likeCount, setLikeCount] = React.useState(0)
     let { post, user_id, translate,lang } = props;

     let _checkIfLike = () => {
          let like = false;
          post.likes.forEach(trg => {
               if (trg.user_id == user_id) {
                    like = true;
               }
          })
          setIsLike(like);
     }


     let _like = () => {
          props._like(post.id);
          setIsLike(true)
          setLikeCount(likeCount + 1)
     }

     let _unLike = () => {
          props._unLike(post.id)
          setIsLike(false)
          setLikeCount(likeCount - 1)

     }
     React.useEffect(() => {
          _checkIfLike();
          setLikeCount(post.likes.length)
     }, [])
     return (
          <View style={{ marginTop: 10, padding: 10 }}>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                         props.navigation.navigate('Profile', {
                              id: props.profile.id
                         })
                    }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                         <Image source={{ uri: props.env.server + props.profile.avatar }} style={{ width: 50, height: 50, borderRadius: 25, borderColor: '#7e7e7e', borderWidth: 1 }} />
                         <View style={{ marginHorizontal: 5 }}>
                              <Text category="h6" style={{ textAlign: 'left' }}>{props.profile.name}</Text>
                              <Text category="s2" style={{ color: 'red',textAlign: 'left' }}>{props.profile.profile.address}</Text>
                         </View>
                    </TouchableOpacity>
                    <View>
                         <Text style={{ fontWeight: 'bold', fontSize: 12,textAlign: 'left' }}>{props.post.created_at}</Text>
                    </View>
               </View>
               <View style={{ marginTop: 10 }}>
                    <Image source={{ uri: props.env.server + props.post.image }} style={{ width: '100%', height: 200, borderRadius: 15 }} />
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                         {isLike &&
                              <TouchableOpacity onPress={() => { _unLike() }}>
                                   <Icon name="heart" style={{ width: 35, height: 35 }} fill="red" />
                              </TouchableOpacity>
                         }
                         {!isLike &&
                              <TouchableOpacity onPress={() => { _like() }}>
                                   <Icon name="heart-outline" style={{ width: 35, height: 35 }} fill="red" />
                              </TouchableOpacity>
                         }
                         <Icon name="message-circle-outline" style={{ width: 35, height: 35, marginHorizontal: 15 }} fill="black" />
                    </View>
               </View>
               <View style={{ marginTop: 5 }}>
                    <Text category="s1" style={{ color: 'red',textAlign: 'left' }}>{likeCount} {translate('post.likes',lang)}</Text>
                    <View style={{ flexDirection: 'column', }}>
                         <Text category="s1" style={{textAlign:'left'}}>{props.profile.name}</Text>
                         <Text category="s2" style={{textAlign: 'left'}}>{props.post.body}</Text>
                    </View>
                    {/* <View style={{marginTop:5}}>
                         <Text category="s1" style={{color:theme['text-hint-color']}}>See all 200 comments</Text>
                    </View> */}
               </View>
          </View>
     );
}

export default PostCard;
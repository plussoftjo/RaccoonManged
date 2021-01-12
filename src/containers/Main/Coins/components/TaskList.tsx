import React from 'react';
import { View,TouchableOpacity,Image } from 'react-native';
import { Text } from '@ui-kitten/components'
import { AntDesign } from '@expo/vector-icons'
export interface Props {
    title: string
    coins: number,
    done: boolean,
    recive:any,
    navigation:any,
    icon:any,
    translate:any,
    scope:string,
    rtl:boolean,
    lang:string
}
const TaskList: React.FC<Props> = (props) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginTop: 4, borderBottomColor: '#7e7e7e', borderBottomWidth: 1,paddingHorizontal:0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    {/* TODO: Add Icon */}
                    <Image source={props.icon} style={{width:30,height:30}} />
                </View>
                <View style={{marginHorizontal:5}}>
                    <Text category="s1" style={{fontWeight:'900'}}>{props.title}</Text>
                    <Text category="s1" style={{color:'#FFD700'}}>+{props.coins.toFixed(2)} {props.translate('coins.coins',props.lang)}</Text>
                </View>
            </View>
            {props.done &&
                <TouchableOpacity onPress={() => {props.recive(props.coins,props.scope);}} style={{ padding:10,borderRadius:30,borderColor:'#FFD700',borderWidth:1,backgroundColor:'rgba(235,255,255,0.3)',justifyContent:'center',alignItems:'center' }}>
                    <Text style={{ color: '#FFD700' }}>+{props.coins.toFixed(2)}</Text>
                </TouchableOpacity>
            }
            {!props.done &&
                <View>
                    <AntDesign  name={props.rtl ? 'caretleft':'caretright'} color="black" />
                </View>
            }

        </View>
    );
}

export default TaskList;
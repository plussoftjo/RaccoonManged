import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Input,Icon } from "@ui-kitten/components";
import {apis} from '../../../../services'
import {translate} from '../../../../translations'

export default ({ setSelectedIndex,rtl }) => {
  let SearchIcon = (props) => <Icon {...props} name="search" />;
  let [search,setSearch] = useState('')
  let [isSearch,setIsSearch] = useState(false)
  let [profiles,setProfiles] = useState([])

  let _search = () => {
    if(!isSearch) {
        setIsSearch(true)
        apis.social.search(
            {search:search},
            (res) => {
                setProfiles(res)
                setIsSearch(false)
            },
            (err) => {
                console.log(err.response);
            });
    }
  }
  return (
    <View>
      <View style={{ marginHorizontal: 15, marginTop: 5 }}>
        <Input placeholder={translate('social.search')} textStyle={{textAlign:rtl ? 'right':'left'}} value={search} onChangeText={val => {
            setSearch(val);
            _search()
            }} accessoryLeft={SearchIcon} />
      </View>
      
    </View>
  );
};

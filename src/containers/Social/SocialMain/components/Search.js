import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Input,Icon } from "@ui-kitten/components";
import {apis} from '../../../../services'
import {translate} from '../../../../translations'

import {connect} from "react-redux"
import {SocialActions} from '../../../../stores'

let Search =  ({ setSelectedIndex,rtl,lang,setIsSearch,setSearchUsers }) => {
  let SearchIcon = (props) => <Icon {...props} name="search" />;
  let [search,setSearch] = useState('')
  let [isSearch,setIsSearchx] = useState(false)
  let [profiles,setProfiles] = useState([])


  let _search = () => {
    if(!isSearch) {
      setIsSearchx(true)
      setIsSearch(true)
        apis.social.search(
            {search:search},
            (res) => {
                setProfiles(res)
                setSearchUsers(res)
                setIsSearch(false)
                setIsSearchx(false)
            },
            (err) => {
                console.log(err.response);
            });
    }
  }
  return (
    <View>
      <View style={{ marginHorizontal: 15, marginTop: 5 }}>
        <Input placeholder={translate('social.search',lang)} textStyle={{textAlign:rtl ? 'right':'left'}} value={search} onChangeText={val => {
            setSearch(val);
            _search()
            }} accessoryLeft={SearchIcon} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
      social:state.social
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      setIsSearch:item => dispatch(SocialActions.setIsSearch(item)),
      setSearchUsers:item => dispatch(SocialActions.setSearchUsers(item))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
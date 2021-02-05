import React from "react";
import { View, Image, ScrollView,TouchableOpacity } from "react-native";
import { Layout, Text, Spinner,Icon } from "@ui-kitten/components";
import { connect } from "react-redux";

import { env } from "../../../../constants";
import { SocialActions } from "../../../../stores";


let SearchResults = (props) => {
  let { isSearch, searchUsers } = props.social;

  let {navigation,setIsSearch,setSearchUsers} = props
  let UserCards = ({ user }) => (
    <TouchableOpacity
          onPress={() => {
               navigation.navigate('Profile',{id:user.id})
          }}
      style={{
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#7e7e7e",
        borderBottomWidth: 1,
      }}
    >
      <Image
        source={{ uri: env.server + user.avatar }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          borderColor: "#7e7e7e",
          borderWidth: 1,
        }}
      />
      <Text category={"s1"}> {user.name}</Text>
    </TouchableOpacity>
  );

  if (isSearch) {
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
          <Text style={{ textAlign: "center" }}>Loading</Text>
        </View>
      </View>
    );
  } else {
    if (searchUsers.length >= 1) {
      return (
        <View style={{ height: "100%", width: "100%" }}>
        <TouchableOpacity onPress={() => {
             setIsSearch(false)
             setSearchUsers([])
             }} style={{alignItems:'flex-end',paddingHorizontal:15,paddingTop:10}}>
              <Icon name="close-circle-outline" style={{width:22,height:22}} fill="black" />
        </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            {searchUsers.map((trg, index) => (
              <UserCards user={trg} key={index} />
            ))}
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  }
};

const mapStateToProps = (state) => {
  return {
    social: state.social,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
       setIsSearch:item => dispatch(SocialActions.setIsSearch(item)),
       setSearchUsers:item => dispatch(SocialActions.setSearchUsers(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

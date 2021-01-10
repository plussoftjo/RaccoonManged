import React from "react";

/** Navigation Components */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

/** Screens */
import {Social} from '../containers'

/** Stack Creator */
const Stack = createStackNavigator();

// ------- Constants -------//
import {Animations} from '../constants'

/** Render() */
export default function MainNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={Animations.screenOptions}
      headerMode="float"
      animation="fade"
      initialRouteName={"SocialMain"}
    >
     <Stack.Screen name="SocialMain" component={Social.SocialMain} />
     <Stack.Screen name="Profile" component={Social.Profile} />
     <Stack.Screen name="AddPost" component={Social.AddPost} />
     <Stack.Screen name="Post" component={Social.Post} />
     <Stack.Screen name="PostFromProfile" component={Social.Post} />
    </Stack.Navigator>
  );
}
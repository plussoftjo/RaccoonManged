import React from "react";

/** Navigation Components */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

/** Screens */
import {Settings} from '../containers'

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
      initialRouteName={"SettingsMain"}
    >
     <Stack.Screen name="SettingsMain" component={Settings.SettingsMain} />
     <Stack.Screen name="UserDetails" component={Settings.UserDetails} />
     <Stack.Screen name="Orders" component={Settings.Orders} />
     <Stack.Screen name="CoinsLogs" component={Settings.CoinsLogs} />
     <Stack.Screen name="Language" component={Settings.Language} />
    </Stack.Navigator>
  );
}
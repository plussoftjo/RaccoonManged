import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";


/** Screens */
import {Main,Settings,Social} from '../containers'
import BottomTapNavigation from './BottomTapNavigation'

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
      initialRouteName={"BottomTapNavigation"}
    >
     <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
     <Stack.Screen name="Prizes" component={Main.Prizes} />
     <Stack.Screen name="ShowPrizesCategories" component={Main.ShowPrizesCategories} />
     <Stack.Screen name="Checkout" component={Main.Checkout} />
     <Stack.Screen name="CheckoutDone" component={Main.CheckoutDone} />
     <Stack.Screen name="SettingsMain" component={Settings.SettingsMain} />
     <Stack.Screen name="UserDetails" component={Settings.UserDetails} />
     <Stack.Screen name="Profile" component={Social.Profile} />
    </Stack.Navigator>
  );
}

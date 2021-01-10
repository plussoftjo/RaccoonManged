import * as React from 'react'


import {
    createDrawerNavigator
} from "@react-navigation/drawer";



const Drawer = createDrawerNavigator();

import {Home} from '../containers/Main'
import DrawerContent from "../components/DrawerContent";

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name={"Home"} component={Home} />
    </Drawer.Navigator>
  );
}
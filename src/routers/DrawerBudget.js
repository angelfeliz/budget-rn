import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabDashboard from "./TabDashboard";
import Budgets from "../pages/Budgets";
import Settings from "../pages/BudgetSettings";
import LogOut from "../pages/LogOut";

const Drawer = createDrawerNavigator();

function DrawerBudget() {
    return (
        <Drawer.Navigator initialRouteName="Dashboard">
          <Drawer.Screen name="Dashboard" component={TabDashboard}/>
          <Drawer.Screen name="Budgets" component={Budgets}/>
          <Drawer.Screen name="Settings" component={Settings}/>
          <Drawer.Screen name="EXAMPLE 1" component={Settings}/>
          <Drawer.Screen name="LogOut" component={LogOut}/>
        </Drawer.Navigator>
    );
}

export default DrawerBudget
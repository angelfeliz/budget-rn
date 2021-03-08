import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Image,
  StyleSheet
} from "react-native";
import Dashboard from "../pages/Dashboard";
import LastTransaction from "../pages/LastTransaction";
import TransactionForm from "../pages/TransactionForm";
import BudgetsResumen from "../pages/BudgetsResumen";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  iconTab: {
    marginTop: 20,
    width: 25,
    height: 25
  }
});
function TabDashboard() {
  return (
      <Tab.Navigator>
        <Tab.Screen 
          name="All"
          options={{
            tabBarLabel: '',
            tabBarIcon: () => ( <Image
              style={styles.iconTab}
              source={require('../assets/images/budgeting.png')}
            />)
          }}
          component={Dashboard} 
        />
        <Tab.Screen
          name="LastTransaction"
          options={{
            title: "History",
            headerTitle: "History",
            tabBarLabel: '',
            tabBarIcon: () => ( <Image
              style={styles.iconTab}
              source={require('../assets/images/bar-chart.png')}
            />)
          }}
          component={LastTransaction}
        />
        <Tab.Screen 
          name="Transaction" 
          component={TransactionForm}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => ( <Image
              style={styles.iconTab}
              source={require('../assets/images/transaction.png')}
            />)
          }} 
        />
        <Tab.Screen 
          name="Resumen"
          options={{
            tabBarLabel: '',
            tabBarIcon: () => ( <Image
              style={styles.iconTab}
              source={require('../assets/images/report.png')}
            />)
          }} 
          component={BudgetsResumen} 
        />
      </Tab.Navigator>
  )
}

export default TabDashboard;
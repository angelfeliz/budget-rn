/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DrawerActions, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
  StyleSheet,  
  Image,
  TouchableOpacity
} from 'react-native';
import SignIn from "./src/pages/SignIn";
import { createStackNavigator } from '@react-navigation/stack';
import DrawerBudget from "./src/routers/DrawerBudget";
import { UserProvider, useUserState } from "./src/context/userContext";
const Stack = createStackNavigator();

const App = () => {
  const user = useUserState();

  return (
    <>      
      <Stack.Navigator>
            {
              !user.token ? (<Stack.Screen name="SignIn" component={SignIn} />) 
              : (<Stack.Screen
                  name="Main"
                  component={DrawerBudget}
                  options={({route, navigation}) => {
                    return {
                    headerTitle: getFocusedRouteNameFromRoute(route),
                    headerLeft: () => {
                      return (<TouchableOpacity
                        style={styles.menuIcon}
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                        >
                          <Image
                            style={styles.menuIcon}
                            source={require('./src/assets/images/menu.png')}
                          />
                        </TouchableOpacity>)
                    }
                  }}}
                />)
            }
          </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    marginLeft: 5,
    width: 27,
    height: 27
  }
});

function WrapperApp() {
  return (
    <UserProvider>
      <NavigationContainer>
        <App/>
      </NavigationContainer>
    </UserProvider>
  )
}

export default WrapperApp;

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { useUserDispach } from "../context/userContext";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
      marginTop: 20,
      width: "80%",      
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
  }
});

function LogOut() {
    const dispatch = useUserDispach();
  
    return (
        <View style={styles.container}>
            <Text>Se you next time.</Text>
           <TouchableOpacity style={styles.button} onPress={() => dispatch({type: 'remove_token'})}>
             <Text>Log out</Text> 
           </TouchableOpacity> 
        </View>
    )
}

export default LogOut
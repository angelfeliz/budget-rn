import React, { useState } from 'react';
import { isEmpty } from "lodash";
import { 
  Text, 
  View, 
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {    
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence
} from 'react-native-reanimated';
import { userLogIn } from "../services/user/user";
import { useUserDispach } from "../context/userContext";

const styles = StyleSheet.create({
    containerKeyBoard: {
        flex: 1 
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: Colors.black
    },
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    button: {       
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    textContainer: {
      height: 130,
      flexDirection: 'column',
      justifyContent: 'center',      
    },
    label: {
      color: Colors.white,
    },
    text: {
      color: 'white',
      borderWidth: 1,
      borderBottomColor: Colors.white,
      marginBottom: 0
    },
    errorMsg: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1
    },
    errorMsgText: {
      color: Colors.white
    },
    box: {
      borderWidth: 3,
      borderColor: 'blue',
      borderRadius: 5,
      width: 35,
      height: 35
    }
});

function SignIn({ navigation }) {
    const [form, setForm] = useState({
      username: "",
      password: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const userDispatch = useUserDispach();
  
    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotateZ: `${rotation.value}deg` }]
      }
    });

    function handleOnChangeText(name) {
        return (text) => {
          if (errorMsg !== "") {
            setErrorMsg("");
          }
          setForm((prev) => ({
            ...prev,
            [name]: text
          }))
        }
    }

    async function onSubmit() {
      try {
        if (!isEmpty(form.username) && !isEmpty(form.password)) {
          setIsLoading(true);
          rotation.value = withSequence(
            withTiming(-10, { duration: 100 }),
            withRepeat(withTiming(100, { duration: 200 }), 6, true),
            withTiming(0, { duration: 100 })
          );
          
         const payload = await userLogIn(form.username, form.password);
         userDispatch({type: 'add_token', token: payload.token});
        } else {
          setErrorMsg("Username or Password is missing.")
        }       
      } catch(err) {
        console.log('ERR**', err)
        setErrorMsg("Someting happen while trying to log in please tray again.");
      }      
    }    
  
    
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.containerKeyBoard}
        >
          <View style={styles.container}>
            <Text>Sign In</Text>
            <View style={styles.innerContainer}>
             { errorMsg !== "" ? 
               (<View style={styles.errorMsg}>
                  <Text style={styles.errorMsgText}>{errorMsg}</Text>
                </View>) : null}
              <View style={styles.textContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.text}
                  value={form.username} 
                  onChangeText={handleOnChangeText('username')}       
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.text}
                  value={form.password}
                  secureTextEntry={true}
                  onChange={handleOnChangeText('password')}          
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>                       
              <TouchableOpacity 
                style={styles.button} 
                onPress={onSubmit}
                disabled={isLoading}
              >
                 { isLoading ? <Animated.View style={[styles.box, animatedStyle]}/> : <Text>Sign In</Text> }
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
    )
}

export default SignIn;
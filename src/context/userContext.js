import React, { useState, createContext, useContext, useReducer } from 'react'
import { ActionSheetIOS } from 'react-native';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

function userReducer(state, action) {
    switch(action.type) {
        case 'add_token': {
            return {
                ...state,
                token: action.token
            }
        }
        case 'remove_token': {
            return {
                ...state,
                token: ""
            }
        }
    }
}
function UserProvider({children}) {
    const [state, setState] = useReducer(userReducer, {
        token: ""
    });
    
    return (
        <UserDispatchContext.Provider value={setState}>
        <UserStateContext.Provider value={state}>
            
                {children}
            
        </UserStateContext.Provider></UserDispatchContext.Provider>
    )
}

function useUserState() {
    const context = useContext(UserStateContext);
    if (context === undefined) {
      throw new Error('useUserState must be used within a UserProvider');
    }

    return context;
}

function useUserDispach() {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
      throw new Error('useUserDispatch must be used within a UserDispatchContext');
    }

    return context;
}

export { UserProvider, useUserState, useUserDispach }
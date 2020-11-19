import React, { createContext, useReducer } from 'react'
import authInitial from './AuthReducer/initialStates'
import authReducer from './AuthReducer/reducer'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(authReducer, authInitial)
    
    return (
        <GlobalContext.Provider
            value={{
                authState, authDispatch
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

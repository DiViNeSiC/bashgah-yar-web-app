import React, { createContext, useReducer } from 'react'

import authReducer from './Auth/reducer'
import authInitial from './Auth/initialStates'

import globalReducer from './GlobalStates/reducer'
import globalInitial from './GlobalStates/initialStates'

import registersReducer from './RegisterControls/reducer'
import registersInitial from './RegisterControls/initialStates'

import gymControlsReducer from './GymControls/reducer'
import gymControlsInitial from './GymControls/initialStates'

import userControlsReducer from './UserControls/reducer'
import userControlsInitial from './UserControls/initialStates'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(authReducer, authInitial)
    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitial)
    const [registersState, registersDispatch] = useReducer(registersReducer, registersInitial)
    const [gymControlsState, gymControlsDispatch] = useReducer(gymControlsReducer, gymControlsInitial)
    const [userControlsState, userControlsDispatch] = useReducer(userControlsReducer, userControlsInitial)
    
    return (
        <GlobalContext.Provider
            value={{
                authState, authDispatch,
                globalState, globalDispatch,
                registersState, registersDispatch,
                gymControlsState, gymControlsDispatch,
                userControlsState, userControlsDispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
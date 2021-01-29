import React, { createContext, useReducer } from 'react'
import { useHistory } from 'react-router-dom'

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

import scheduleControlsReducer from './ScheduleControls/reducer'
import scheduleControlsInitial from './ScheduleControls/initialStates'

import communicationControlsReducer from './CommunicationControls/reducer'
import communicationControlsInitial from './CommunicationControls/initialStates'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const history = useHistory()
    const [authState, authDispatch] = useReducer(authReducer, authInitial)
    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitial)
    const [registersState, registersDispatch] = useReducer(registersReducer, registersInitial)
    const [gymControlsState, gymControlsDispatch] = useReducer(gymControlsReducer, gymControlsInitial)
    const [userControlsState, userControlsDispatch] = useReducer(userControlsReducer, userControlsInitial)
    const [scheduleControlsState, scheduleControlsDispatch] = useReducer(scheduleControlsReducer, scheduleControlsInitial)
    const [communicationControlsState, communicationControlsDispatch] = useReducer(communicationControlsReducer, communicationControlsInitial)

    
    return (
        <GlobalContext.Provider
            value={{
                history,
                authState, authDispatch,
                globalState, globalDispatch,
                registersState, registersDispatch,
                gymControlsState, gymControlsDispatch,
                userControlsState, userControlsDispatch,
                scheduleControlsState, scheduleControlsDispatch,
                communicationControlsState, communicationControlsDispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
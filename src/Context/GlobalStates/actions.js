import { 
    LOADING, CLEAR_STATUS, CLEAR_LOADING, TOASTER_INFO, 
    TOASTER_ERROR, TOASTER_SUCCESS, TOASTER_DEFAULT, TOASTER_WARNING,
} from '../../Constants/Actions/globalStates'

export const enableLoading = (globalDispatch) => { globalDispatch({ type: LOADING }) }
export const disableLoading = (globalDispatch) => { globalDispatch({ type: CLEAR_LOADING }) }

export const clearStatus = (globalDispatch, wait) => {
    if (!wait) return globalDispatch({ type: CLEAR_STATUS })
    setTimeout(() => globalDispatch({ type: CLEAR_STATUS }), 1000)
}

export const toasterInfo = (message, waitForRedirect = false) => (globalDispatch) => { 
    globalDispatch({ type: TOASTER_INFO, payload: { message, waitForRedirect } }) 
}

export const toasterError = (message, waitForRedirect = false) => (globalDispatch) => { 
    globalDispatch({ type: TOASTER_ERROR, payload: { message, waitForRedirect } }) 
}

export const toasterSuccess = (message, waitForRedirect = false) => (globalDispatch) => { 
    globalDispatch({ type: TOASTER_SUCCESS, payload: { message, waitForRedirect } }) 
}

export const toasterDefault = (message, waitForRedirect = false) => (globalDispatch) => { 
    globalDispatch({ type: TOASTER_DEFAULT, payload: { message, waitForRedirect } }) 
}

export const toasterWarning = (message, waitForRedirect = false) => (globalDispatch) => { 
    globalDispatch({ type: TOASTER_WARNING, payload: { message, waitForRedirect } }) 
}
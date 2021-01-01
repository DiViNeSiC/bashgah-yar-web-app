import { 
    LOADING, CLEAR_STATUS, CLEAR_LOADING, TOASTER_WARNING,
    TOASTER_INFO, TOASTER_ERROR, TOASTER_SUCCESS, TOASTER_DEFAULT,
} from '../../Constants/Actions/globalStates'

export default (state, { payload, type }) => {
    switch(type) {
        case LOADING: return { ...state, loading: true }
        case CLEAR_LOADING: return { ...state, loading: false }
        
        case TOASTER_INFO: return { 
            ...state, loading: false, toasterInfo: true, 
            toasterMessage: payload.message, waitForRedirect: payload.waitForRedirect 
        }

        case TOASTER_ERROR: return { 
            ...state, loading: false, toasterError: true, 
            toasterMessage: payload.message, waitForRedirect: payload.waitForRedirect 
        }

        case TOASTER_WARNING: return { 
            ...state, loading: false, toasterWarning: true, 
            toasterMessage: payload.message, waitForRedirect: payload.waitForRedirect 
        }

        case TOASTER_SUCCESS: return { 
            ...state, loading: false, toasterSuccess: true,
            toasterMessage: payload.message, waitForRedirect: payload.waitForRedirect 
        }

        case TOASTER_DEFAULT: return { 
            ...state, loading: false, toasterDefaultMessage: true, 
            toasterMessage: payload.message, waitForRedirect: payload.waitForRedirect 
        }

        case CLEAR_STATUS: return {
            ...state,
            message: null,
            loading: false,
            toasterInfo: false,
            toasterError: false,
            toasterSuccess: false,
            toasterWarning: false,
            waitForRedirect: false,
            toasterDefaultMessage: false,
        }

        default: return state
    }
}
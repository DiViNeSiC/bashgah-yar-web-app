import { 
    SEND_CONFIRMATION_CODE_LOADING, SEND_CONFIRMATION_CODE_TIME_DISABLE,
    LOGOUT_STATES_DISABLE, CHANGE_PASS_CONFIRM_WITH_TOKEN, SEND_CONFIRMATION_CODE_SUCCESS,
    REGULAR_LOGIN_SUCCESS, LOGOUT_LOADING, LOGOUT_SUCCESS, GET_USER_PROFILE, CONFIRM_CODE_SUCCESS,
    FORGOT_PASS_WITH_EMAIL, FORGOT_PASS_WITH_PHONE, CONFIRM_CODE_FORM_HIDE, CHANGE_PASS_CONFIRM_WITH_CODE,
} from '../../Constants/Actions/auth'

export default (state, { payload, type }) => {
    switch(type) {
        case GET_USER_PROFILE: return { ...state, user: payload }

        case FORGOT_PASS_WITH_EMAIL: return { ...state, forgotPassEmailPending: true }
        case FORGOT_PASS_WITH_PHONE: return { ...state, forgotPassPhoneSmsPending: true }

        case SEND_CONFIRMATION_CODE_LOADING: return { ...state, sendConfirmCodeLoading: true }
        case SEND_CONFIRMATION_CODE_TIME_DISABLE: return { ...state, sendConfirmationCodeTimer: false }
        case SEND_CONFIRMATION_CODE_SUCCESS: return { 
            ...state, sendConfirmationCodeTimer: true, sendConfirmCodeLoading: false
        }

        case LOGOUT_LOADING: return { ...state, logoutLoading: true }
        case LOGOUT_STATES_DISABLE: return { ...state, logoutLoading: false, logoutSuccess: false }
        case LOGOUT_SUCCESS: {
            localStorage.removeItem('BASHGAH_YAR_ENTRY_TOKEN')
            localStorage.removeItem('BASHGAH_YAR_REFRESH_TOKEN')
            return { ...state, logoutSuccess: true } 
        }

        case REGULAR_LOGIN_SUCCESS: {
            if (payload.continue && payload.regularLoginToken) return { 
                ...state, 
                confirmationCodeFormShow: true, 
                regularLoginToken: payload.regularLoginToken 
            }
            if (!payload.continue && payload.entryToken && payload.refreshToken && payload.user) {
                localStorage.BASHGAH_YAR_ENTRY_TOKEN = payload.entryToken
                localStorage.BASHGAH_YAR_REFRESH_TOKEN = payload.refreshToken
                return { ...state, user: payload.user, regularLoginToken: null }
            }

            return { ...state }
        }

        case CHANGE_PASS_CONFIRM_WITH_TOKEN: return { 
            ...state, forgotPassEmailPending: false, changePassSuccess: true 
        }
        case CHANGE_PASS_CONFIRM_WITH_CODE: return { 
            ...state, forgotPassPhoneSmsPending: false, changePassSuccess: true 
        }
        
        case CONFIRM_CODE_FORM_HIDE: return { 
            ...state, confirmationCodeFormShow: false, sendConfirmationCodeTimer: false 
        }
        case CONFIRM_CODE_SUCCESS: {
            localStorage.BASHGAH_YAR_ENTRY_TOKEN = payload.entryToken
            localStorage.BASHGAH_YAR_REFRESH_TOKEN = payload.refreshToken
            localStorage.BASHGAH_YAR_CONFIRMATION_TOKEN = payload.confirmationToken
            return { ...state, user: payload.user, regularLoginToken: null }
        }

        default: return state
    }
}
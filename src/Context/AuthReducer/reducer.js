import { 
    ERROR,
    LOADING, 
    REGULAR_LOGIN_SUCCESS,
    SEND_CODE_SUCCESS,
    CONFIRM_SUCCESS, 
    CODE_FORM_HIDE,
    GET_USER,
    SENDING_TIMER_HIDE,
    CLEAR_STATUS
} from '../../Constants/auth'

export default (state, { payload, type }) => {
    switch(type) {
        case LOADING: return {
            ...state,
            loading: true
        }
        
        case REGULAR_LOGIN_SUCCESS: return {
            ...state,
            loading: false,
            codeFormShow: true,
            regularLoginToken: payload.regularLoginToken
        }
        
        case SEND_CODE_SUCCESS: return {
            ...state,
            loading: false,
            success: true,
            sendTimer: true,
            successMessage: 'کد تایید برای شما فرستاده شد'
        }
        
        case CONFIRM_SUCCESS: {
            localStorage.BASHGAH_YAR_ENTRY_TOKEN = payload.entryToken
            localStorage.BASHGAH_YAR_REFRESH_TOKEN = payload.refreshToken
            return {
                ...state,
                loading: false,
                success: true,
                regularLoginToken: null,
                successMessage: 'خوش آمدید'
            }
        }

        case GET_USER: return {
            ...state,
            loading: false,
            user: payload.user
        }
        
        case ERROR: return {
            ...state,
            loading: false,
            error: true,
            errorMessage: payload.message
        }

        case CODE_FORM_HIDE: return {
            ...state,
            codeFormShow: false,
            sendTimer: false,
            success: false,
            error: false
        }

        case SENDING_TIMER_HIDE: return {
            ...state,
            sendTimer: false
        }

        case CLEAR_STATUS: return {
            ...state,
            success: false,
            error: false,
            successMessage: null,
            errorMessage: null
        }
    
        default: return state
    }
}
import { 
    SET_AVATAR_FILE, SET_GYM_PIC_FILES, SET_REGISTER_METHODS,
    ACTIVE_ACCOUNT_ERROR, REGISTER_SUCCESS, ACTIVE_ACCOUNT_SUCCESS,
    SET_REGISTER_METHOD_OPTION, SEND_ACTIVATION_ACCOUNT_EMAIL, REGISTER_SUCCESS_DISABLE,
} from '../../Constants/Actions/registers'

export default (state, { payload, type }) => {
    switch(type) {
        case SET_GYM_PIC_FILES: return { ...state, gymPics: payload }
        case SET_AVATAR_FILE: return { ...state, avatarFile: payload }
        case REGISTER_SUCCESS: return { ...state, registerSuccess: true }
        case SET_REGISTER_METHODS: return { ...state, registersMethods: payload }
        case SET_REGISTER_METHOD_OPTION: return { ...state, selectedMethod: payload }
        case REGISTER_SUCCESS_DISABLE: return { ...state, registerSuccess: false }
        case SEND_ACTIVATION_ACCOUNT_EMAIL: return { ...state, activeAccountEmailPending: true }

        case ACTIVE_ACCOUNT_SUCCESS: return {
            ...state,
            activeAccountSuccess: payload,
            activeAccountEmailPending: false
        }

        case ACTIVE_ACCOUNT_ERROR: return {
            ...state,
            activeAccountError: payload,
            activeAccountEmailPending: false
        }

        default: return state
    }
}
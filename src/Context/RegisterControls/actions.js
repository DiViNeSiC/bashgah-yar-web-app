import axios from '../../Helpers/axiosInstance'
import { toasterInfo, toasterError, enableLoading, toasterSuccess, disableLoading } from '../GlobalStates/actions'
import { 
    SET_AVATAR_FILE, SET_GYM_PIC_FILES, SET_REGISTER_METHODS,
    ACTIVE_ACCOUNT_ERROR, REGISTER_USER_SUCCESS, ACTIVE_ACCOUNT_SUCCESS,
    SET_REGISTER_METHOD_OPTION, SEND_ACTIVATION_ACCOUNT_EMAIL, REGISTER_USER_SUCCESS_DISABLE,
} from '../../Constants/Actions/registers'

export const registerUserSuccessDisable = (dispatch) => { dispatch({ type: REGISTER_USER_SUCCESS_DISABLE }) }

export const setRegisterMethods = (methods) => (dispatch) => { 
    dispatch({ type: SET_REGISTER_METHODS, payload: methods }) 
}

export const setRegisterMethodOption = (option) => (dispatch) => { 
    dispatch({ type: SET_REGISTER_METHOD_OPTION, payload: option }) 
}

export const setAvatarFile = (file, sendMessage, message, toasterFunc) => (dispatch, globalDispatch) => {
    dispatch({ type: SET_AVATAR_FILE, payload: file })
    if (sendMessage) toasterFunc(message)(globalDispatch)
}

export const setGymPicFiles = (files, sendMessage, message, toasterFunc) => (dispatch, globalDispatch) => {
    dispatch({ type: SET_GYM_PIC_FILES, payload: files })
    if (sendMessage) toasterFunc(message)(globalDispatch)
}

export const registerNewUser = (userType, formData) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const url = userType ? `/gym/${userType}` : '/gym'
        const response = await axios(history).post(url, formData)
        dispatch({ type: REGISTER_USER_SUCCESS })
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const sendActivationAccountEmail = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post('/auth/active-email')
        dispatch({ type: SEND_ACTIVATION_ACCOUNT_EMAIL })
        toasterInfo(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const activeAccount = (accountActivationToken) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put(`/auth/active-email/${accountActivationToken}`)
        dispatch({ type: ACTIVE_ACCOUNT_SUCCESS, payload: response.data.message })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: ACTIVE_ACCOUNT_ERROR, payload: errorMessage })
    }
}
import axios from '../../Helpers/axiosInstance'
import { 
    LOADING,
    ERROR,
    REGULAR_LOGIN_SUCCESS,
    SEND_CODE_SUCCESS,
    GET_USER,
    CONFIRM_SUCCESS
} from '../../Constants/auth'

const regularLogin = (formData) => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        const response = await axios().post('/auth/login', formData)
        dispatch({ type: REGULAR_LOGIN_SUCCESS, payload: response.data })
    } catch (err) {
        dispatch({ type: ERROR, payload: err })
    }
}

const sendCode = (regularLoginToken) => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        await axios().post('/auth/send-code', { regularLoginToken })
        dispatch({ type: SEND_CODE_SUCCESS })
    } catch (err) {
        dispatch({ type: ERROR, payload: err })
    }
}


const confirmCode = (formData) => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        const response = await axios().post('/auth/confirm-code', formData)
        dispatch({ type: CONFIRM_SUCCESS, payload: response.data })
    } catch (err) {
        dispatch({ type: ERROR, payload: err })
    }
}

const getUser = async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        const response = await axios().get('/user')
        dispatch({ type: GET_USER, payload: response.data })
    } catch (err) {
        dispatch({ type: ERROR, payload: err })
    }
}

export { regularLogin, sendCode, confirmCode, getUser }
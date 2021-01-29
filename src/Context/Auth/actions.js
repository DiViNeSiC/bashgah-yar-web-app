import axios from '../../Helpers/axiosInstance'
import {
    toasterInfo, toasterError, enableLoading,
    disableLoading, toasterDefault, toasterSuccess,
} from '../GlobalStates/actions'
import {
    FORGOT_PASS_WITH_EMAIL, FORGOT_PASS_WITH_PHONE, CONFIRM_CODE_FORM_HIDE, REFRESH_TOKEN,
    SEND_CONFIRMATION_CODE_TIME_DISABLE, LOGOUT_LOADING, LOGOUT_SUCCESS, GET_USER_PROFILE,
    CHANGE_PASS_CONFIRM_WITH_CODE, SEND_CONFIRMATION_CODE_LOADING, CHANGE_PASS_CONFIRM_WITH_TOKEN,
    SEND_CONFIRMATION_CODE_SUCCESS, CONFIRM_CODE_SUCCESS, REGULAR_LOGIN_SUCCESS, LOGOUT_STATES_DISABLE,
} from '../../Constants/Actions/auth'

export const logoutDisableStates = (dispatch) => { dispatch({ type: LOGOUT_STATES_DISABLE }) }
export const confirmCodeFormHide = (dispatch) => { dispatch({ type: CONFIRM_CODE_FORM_HIDE }) }
export const sendConfirmCodeTimeDisable = (dispatch) => { dispatch({ type: SEND_CONFIRMATION_CODE_TIME_DISABLE }) }

export const regularLogin = (formData, clearFormData) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post('/auth/login', formData)
        clearFormData()
        dispatch({ type: REGULAR_LOGIN_SUCCESS, payload: response.data })
        if (response.data.continue) return disableLoading(globalDispatch)
        toasterDefault('خوش آمدید', true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const sendCode = (regularLoginToken) => async (dispatch, globalDispatch, history = null) => {
    try {
        dispatch({ type: SEND_CONFIRMATION_CODE_LOADING })
        await axios(history).post('/auth/send-code', { regularLoginToken })
        dispatch({ type: SEND_CONFIRMATION_CODE_SUCCESS })
        toasterInfo('.کد تایید برای شما فرستاده شد، تلفن خود را چک کنید')(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}


export const confirmCode = (formData, clearFormData) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post('/auth/confirm-code', formData)
        clearFormData()
        dispatch({ type: CONFIRM_CODE_SUCCESS, payload: response.data })
        toasterDefault('خوش آمدید', true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const getUser = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get('/user')
        dispatch({ type: GET_USER_PROFILE, payload: response.data.user })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const forgotPassWithEmail = (email) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post('/auth/forgot-pass/email', { email })
        dispatch({ type: FORGOT_PASS_WITH_EMAIL })
        toasterInfo(response.data.message, true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const forgotPassWithPhone = (phoneNumber) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post('/auth/forgot-pass/phone', { phoneNumber })
        dispatch({ type: FORGOT_PASS_WITH_PHONE })
        toasterInfo(response.data.message, true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const changePassWithToken = (newPassword, token) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put(`/auth/forgot-pass/token/${token}`, { newPassword })
        dispatch({ type: CHANGE_PASS_CONFIRM_WITH_TOKEN })
        toasterSuccess(response.data.message, true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const changePassWithCode = (newPassword, resetPassCode) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put('/auth/forgot-pass/time-code', { newPassword, resetPassCode })
        dispatch({ type: CHANGE_PASS_CONFIRM_WITH_CODE })
        toasterSuccess(response.data.message, true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const refreshTokenVerify = (refreshToken) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put(`/auth/refresh/${refreshToken}`)
        dispatch({ type: REFRESH_TOKEN, payload: response.data })
        toasterSuccess(response.data.message, true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const logout = async (dispatch, globalDispatch, history = null) => {
    try {
        dispatch({ type: LOGOUT_LOADING })
        const response = await axios(history).delete('/auth/logout')
        dispatch({ type: LOGOUT_SUCCESS })
        toasterSuccess(response.data.message, )(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        dispatch({ type: LOGOUT_STATES_DISABLE })
        toasterError(errorMessage)(globalDispatch)
    }
}
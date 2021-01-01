import axios from '../../Helpers/axiosInstance'
import { toasterInfo, toasterError, enableLoading, disableLoading, toasterSuccess } from '../GlobalStates/actions'
import {
    SET_INPUT_TYPE, SET_INPUT_SHOW, GET_USER_BY_ID_ERROR,
    GET_GYM_ATHLETES_ERROR, SEND_CHANGE_PASS_EMAIL, GET_USER_BY_ID_SUCCESS,
    GET_GYM_ATHLETES_SUCCESS, GET_ALL_GYM_ADMINS_ERROR, DELETE_USER_BY_ID_SUCCESS,
    GET_ALL_GYM_ADMINS_SUCCESS, CHANGE_PASS_CONFIRM_SUCCESS, DELETE_USER_BY_ID_DISABLE_SUCCESS,
    GET_GYM_COACHES_AND_ATHLETES_ERROR, CHANGE_PASS_CONFIRM_DISABLE_SUCCESS, GET_GYM_COACHES_AND_ATHLETES_SUCCESS,
} from '../../Constants/Actions/userControls'

export const searchUsers = (type, queries) => (dispatch) => { dispatch({ type, payload: queries }) }
export const setInputType = (type) => (dispatch) => { dispatch({ type: SET_INPUT_TYPE, payload: type }) }
export const setInputShow = (state) => (dispatch) => { dispatch({ type: SET_INPUT_SHOW, payload: state }) }
export const deleteUserSuccessDisable = (dispatch) => { dispatch({ type: DELETE_USER_BY_ID_DISABLE_SUCCESS }) }
export const changePassConfirmSuccessDisable = (dispatch) => { dispatch({ type: CHANGE_PASS_CONFIRM_DISABLE_SUCCESS }) }

export const getAllGymAdmins = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get('/user/gym-admins')
        dispatch({ type: GET_ALL_GYM_ADMINS_SUCCESS, payload: response.data.gymAdmins })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GET_ALL_GYM_ADMINS_ERROR, payload: errorMessage })
    }
}

export const getGymCoachesAndAthletes = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get('/user/gym-users')
        dispatch({ type: GET_GYM_COACHES_AND_ATHLETES_SUCCESS, payload: response.data })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GET_GYM_COACHES_AND_ATHLETES_ERROR, payload: errorMessage })
    }
}

export const getGymAthletes = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get('/user/gym-athletes')
        dispatch({ type: GET_GYM_ATHLETES_SUCCESS, payload: response.data.athletes })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GET_GYM_ATHLETES_ERROR, payload: errorMessage })
    }
}

export const getUserById = (userId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get(`/user/all/${userId}`)
        dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: response.data.user })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GET_USER_BY_ID_ERROR, payload: errorMessage })
    }
}

export const deleteGymStaffById = (userId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete(`/user/gym-staff/${userId}`)
        dispatch({ type: DELETE_USER_BY_ID_SUCCESS })
        toasterSuccess(response.data.message, true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const updateEmail = (email, updateUser, disableInputs) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put('/user/email', { email })
        updateUser()
        disableInputs(false)
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const updateCredentials = (formData, updateUser, disableInputs) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put('/user/credentials', formData)
        updateUser()
        disableInputs(false)
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const updateAvatar = (avatarData, updateUser, deleteUploadingAvatar) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put('/user/avatar', avatarData)
        updateUser()
        deleteUploadingAvatar()
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const sendChangePasswordEmail = (currentPassword, disableInputs) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post('/user/change-password', { currentPassword })
        disableInputs(false)
        dispatch({ type: SEND_CHANGE_PASS_EMAIL })
        toasterInfo(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const changePasswordConfirm = (changePasswordToken, newPassword) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put(`/user/change-password/${changePasswordToken}`, { newPassword })
        dispatch({ type: CHANGE_PASS_CONFIRM_SUCCESS })
        toasterSuccess(response.data.message, true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const deleteAvatar = (updateUser) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete('/user/avatar')
        updateUser()
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}
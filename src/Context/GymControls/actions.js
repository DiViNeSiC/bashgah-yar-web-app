import axios from '../../Helpers/axiosInstance'
import { toasterError, enableLoading, disableLoading, toasterSuccess } from '../GlobalStates/actions'
import {
    GLOBAL_GYMS_ERROR, GET_ONE_GYM_ERROR, DELETE_GYM_SUCCESS,
    GET_ONE_GYM_SUCCESS, GET_GYM_STAFF_ERROR, GLOBAL_GYMS_SUCCESS,
    GET_ADMIN_GYMS_ERROR, GET_GYM_STAFF_SUCCESS, GET_ADMIN_GYMS_SUCCESS,
    GET_GYM_FOR_EDIT_ERROR, GET_GYM_FOR_EDIT_SUCCESS, DELETE_GYM_DISABLE_SUCCESS,
} from '../../Constants/Actions/gymControls'

export const searchGyms = (type, queries) => (dispatch) => { dispatch({ type, payload: queries }) }
export const deleteGymDisableSuccess = (dispatch) => { dispatch({ type: DELETE_GYM_DISABLE_SUCCESS }) }

export const getGlobalGyms = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get('/gym')
        dispatch({ type: GLOBAL_GYMS_SUCCESS, payload: response.data.gyms })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GLOBAL_GYMS_ERROR, payload: errorMessage })
    }
}

export const getGymById = (gymId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get(`/gym/${gymId}`)
        dispatch({ type: GET_ONE_GYM_SUCCESS, payload: response.data.gym })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GET_ONE_GYM_ERROR, payload: errorMessage })
    }
}

export const getGymStaff = (gymId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get(`/gym/staff/${gymId}`)
        dispatch({ type: GET_GYM_STAFF_SUCCESS, payload: response.data })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GET_GYM_STAFF_ERROR, payload: errorMessage })
    }
}

export const getGymByIdForEdit = (gymId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get(`/gym/edit/${gymId}`)
        dispatch({ type: GET_GYM_FOR_EDIT_SUCCESS, payload: response.data.gym })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GET_GYM_FOR_EDIT_ERROR, payload: errorMessage })
    }
}

export const getAdminGyms = (adminId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get(`/gym/admin/${adminId}`)
        dispatch({ type: GET_ADMIN_GYMS_SUCCESS, payload: response.data })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        disableLoading(globalDispatch)
        dispatch({ type: GET_ADMIN_GYMS_ERROR, payload: errorMessage })
    }
}

export const changeGymBanState = (gymId, banState = true) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const url = banState ? `/gym/ban/${gymId}` : `/gym/unban/${gymId}`
        const response = await axios(history).put(url)
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const editGymInfo = (formData, gymId, updateGym) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put(`/gym/info/${gymId}`, formData)
        updateGym(); toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const addPicture = (gymPicFormData, gymId, clearPicture, updateGym) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post(`/gym/picture/${gymId}`, gymPicFormData)
        clearPicture(); updateGym(); toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const changeGymHolidays = (gymId, newHolidays, updateGym) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put(`/gym/holidays/${gymId}`, { newHolidays })
        updateGym(); toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const deleteOnePicture = (gymId, filename, updateGym) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete(`/gym/picture/${gymId}/${filename}`)
        updateGym(); toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const deleteAllPictures = (gymId, updateGym) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete(`/gym/picture/${gymId}`)
        updateGym(); toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const deleteGymAccount = (gymId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete(`/gym/remove/${gymId}`)
        dispatch({ type: DELETE_GYM_SUCCESS })
        toasterSuccess(response.data.message, true)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}
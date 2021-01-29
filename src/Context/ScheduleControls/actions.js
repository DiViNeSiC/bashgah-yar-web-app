import axios from '../../Helpers/axiosInstance'
import { toasterError, enableLoading, toasterSuccess, disableLoading } from '../GlobalStates/actions'
import { 
    GET_SCHEDULE_BY_ID_ERROR, GET_ATHLETE_SCHEDULES_ERROR, GET_SPORT_MOVE_BY_ID_ERROR,
    GET_SPORT_MOVES, GET_SPORT_MOVES_ERROR, GET_SCHEDULE_BY_ID, GET_SPORT_MOVE_BY_ID, GET_ATHLETE_SCHEDULES,
} from '../../Constants/Actions/scheduleControls'

export const getSportMoves = async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get('/schedules/move')
        dispatch({ type: GET_SPORT_MOVES, payload: response.data.moves })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        dispatch({ type: GET_SPORT_MOVES_ERROR, payload: errorMessage })
        disableLoading(globalDispatch)
    }
}

export const getSportMoveById = (moveId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get(`/schedules/move/${moveId}`)
        dispatch({ type: GET_SPORT_MOVE_BY_ID, payload: response.data.move })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        dispatch({ type: GET_SPORT_MOVE_BY_ID_ERROR, payload: errorMessage })
        disableLoading(globalDispatch)
    }
}

export const getScheduleById = (scheduleId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get(`/schedules/${scheduleId}`)
        dispatch({ type: GET_SCHEDULE_BY_ID, payload: response.data.schedule })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        dispatch({ type: GET_SCHEDULE_BY_ID_ERROR, payload: errorMessage })
        disableLoading(globalDispatch)
    }
}

export const getAthleteSchedules = (athleteId) => async (dispatch, globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).get(`/schedules/athlete/${athleteId}`)
        dispatch({ type: GET_ATHLETE_SCHEDULES, payload: response.data })
        disableLoading(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        dispatch({ type: GET_ATHLETE_SCHEDULES_ERROR, payload: errorMessage })
        disableLoading(globalDispatch)
    }
}

export const createNewMove = (formData, clearMoveData) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post('/schedules/move', formData)
        clearMoveData(); toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const createNewSchedule = (formData, athleteId) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).post(`/schedules/schedule/${athleteId}`, formData)
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const changeMoveTaskCompleteSection = (changedMoves, scheduleId) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).put(`/schedules/check-moves/${scheduleId}`, { changedMoves })
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const deleteSportMove = (moveId) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete(`/schedules/move/${moveId}`)
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}

export const deleteSchedule = (scheduleId) => async (globalDispatch, history = null) => {
    try {
        enableLoading(globalDispatch)
        const response = await axios(history).delete(`/schedules/schedule/${scheduleId}`)
        toasterSuccess(response.data.message)(globalDispatch)
    } catch (err) {
        const error = err.response ? err.response : err
        const errorMessage = error.data?.message ? error.data.message : error.message
        toasterError(errorMessage)(globalDispatch)
    }
}
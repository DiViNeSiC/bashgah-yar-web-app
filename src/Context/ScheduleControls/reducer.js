import {
    GET_SCHEDULE_BY_ID_ERROR, GET_ATHLETE_SCHEDULES_ERROR, GET_SPORT_MOVE_BY_ID_ERROR,
    GET_SPORT_MOVES, GET_SPORT_MOVES_ERROR, GET_SCHEDULE_BY_ID, GET_SPORT_MOVE_BY_ID, GET_ATHLETE_SCHEDULES,
} from '../../Constants/Actions/scheduleControls'

export default (state, { payload, type }) => {
    switch(type) {
        case GET_SPORT_MOVES: return { ...state, sportMoves: payload, scheduleControlsError: null }
        case GET_SPORT_MOVES_ERROR: return { ...state, sportMoves: null, scheduleControlsError: payload }

        case GET_SPORT_MOVE_BY_ID: return { ...state, sportMove: payload, scheduleControlsError: null }
        case GET_SPORT_MOVE_BY_ID_ERROR: return { ...state, sportMove: null, scheduleControlsError: payload }

        case GET_SCHEDULE_BY_ID: return { ...state, schedule: payload, scheduleControlsError: null }
        case GET_SCHEDULE_BY_ID_ERROR: return { ...state, schedule: null, scheduleControlsError: payload }

        case GET_ATHLETE_SCHEDULES: return { 
            ...state, 
            scheduleControlsError: null,
            athleteSchedules: { athlete: payload.athlete, schedules: payload.schedules }, 
        }
        case GET_ATHLETE_SCHEDULES_ERROR: return { 
            ...state, 
            athleteSchedules: null, 
            scheduleControlsError: payload,
        }

        default: return state
    }
}
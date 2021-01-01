import { searchUser } from '../../Utils/searches'
import { 
    SET_INPUT_TYPE, SET_INPUT_SHOW, SEARCH_ATHLETES,
    SEARCH_GYM_ADMINS, GET_USER_BY_ID_ERROR, GET_GYM_ATHLETES_ERROR,
    SEND_CHANGE_PASS_EMAIL, GET_USER_BY_ID_SUCCESS, GET_GYM_ATHLETES_SUCCESS,
    GET_ALL_GYM_ADMINS_ERROR, DELETE_USER_BY_ID_SUCCESS, GET_ALL_GYM_ADMINS_SUCCESS,
    CHANGE_PASS_CONFIRM_SUCCESS, SEARCH_COACHES_AND_ATHLETES, DELETE_USER_BY_ID_DISABLE_SUCCESS,
    GET_GYM_COACHES_AND_ATHLETES_ERROR, CHANGE_PASS_CONFIRM_DISABLE_SUCCESS, GET_GYM_COACHES_AND_ATHLETES_SUCCESS,
} from '../../Constants/Actions/userControls'

export default (state, { payload, type }) => {
    switch(type) {
        case SET_INPUT_TYPE: return { ...state, inputType: payload }
        case SET_INPUT_SHOW: return { ...state, inputShow: payload }

        case GET_USER_BY_ID_ERROR: return { ...state, userControlsErr: payload, selectedUser: null }
        case GET_USER_BY_ID_SUCCESS: return { ...state, userControlsErr: null, selectedUser: payload }

        case SEND_CHANGE_PASS_EMAIL: return { ...state, changePassEmailPending: true }
        case CHANGE_PASS_CONFIRM_DISABLE_SUCCESS: return { ...state, changePassConfirmSuccess: false }
        case CHANGE_PASS_CONFIRM_SUCCESS: return { 
            ...state, changePassEmailPending: false,  changePassConfirmSuccess: true 
        }

        case DELETE_USER_BY_ID_DISABLE_SUCCESS: return { ...state, successfulUserDelete: false }
        case DELETE_USER_BY_ID_SUCCESS: return { ...state, selectedUser: null, successfulUserDelete: true }

        case GET_GYM_ATHLETES_ERROR: return { ...state, userControlsErr: payload,  gymAthletes: null }
        case GET_GYM_ATHLETES_SUCCESS: return { ...state, userControlsErr: null,  gymAthletes: payload }

        case SEARCH_ATHLETES: return { 
            ...state,
            searchedGymAthletes: searchUser(state.gymAthletes, payload),
            isSearching: payload?.name?.length > 0 || 
                payload?.lastname?.length > 0 || 
                payload?.username?.length > 0 || 
                !!payload?.role || false,
        }

        case GET_ALL_GYM_ADMINS_ERROR: return { ...state, userControlsErr: payload,  gymAdmins: null }
        case GET_ALL_GYM_ADMINS_SUCCESS: return { ...state, userControlsErr: null,  gymAdmins: payload }

        case SEARCH_GYM_ADMINS: return { 
            ...state,
            searchedGymAdmins: searchUser(state.gymAdmins, payload),
            isSearching: payload?.name?.length > 0 ||
                payload?.lastname?.length > 0 || 
                payload?.username?.length > 0 || 
                !!payload?.role || false,
        }

        case GET_GYM_COACHES_AND_ATHLETES_ERROR: return { ...state, userControlsErr: payload, gymAthletes: null,  gymCoaches: null }
        case GET_GYM_COACHES_AND_ATHLETES_SUCCESS: return { 
            ...state, userControlsErr: null, gymAthletes: payload.athletes,  gymCoaches: payload.coaches 
        }
        
        case SEARCH_COACHES_AND_ATHLETES: return { 
            ...state,
            searchedGymAthletes: searchUser(state.gymAthletes, payload),
            searchedGymCoaches: searchUser(state.gymCoaches, payload),
            isSearching: payload?.name?.length > 0 ||
                payload?.lastname?.length > 0 || 
                payload?.username?.length > 0 || 
                !!payload?.role || false,
        }

        default: return state
    }
}
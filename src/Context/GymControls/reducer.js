import { searchGym, searchGymStaff } from '../../Utils/searches'
import {
    GET_GYM_STAFF_ERROR, GLOBAL_GYMS_SUCCESS, GET_ADMIN_GYMS_ERROR,
    GET_GYM_STAFF_SUCCESS, GET_ADMIN_GYMS_SUCCESS, GET_GYM_FOR_EDIT_ERROR,
    GET_GYM_FOR_EDIT_SUCCESS, SEARCH_GYM_STAFF_COACHES, SEARCH_GYM_STAFF_MANAGERS,
    SEARCH_GYM_STAFF_ATHLETES, GLOBAL_GYMS_ERROR, GET_ONE_GYM_ERROR, SEARCH_ADMIN_GYMS,
    DELETE_GYM_DISABLE_SUCCESS, SEARCH_GLOBAL_GYMS, DELETE_GYM_SUCCESS, GET_ONE_GYM_SUCCESS,
} from '../../Constants/Actions/gymControls'

export default (state, { payload, type }) => {
    switch(type) {
        case GET_ONE_GYM_ERROR: return { ...state, gymControlsErr: payload, oneGym: null }
        case GET_ONE_GYM_SUCCESS: return { ...state, gymControlsErr: null, oneGym: payload }
        
        case GLOBAL_GYMS_ERROR: return { ...state, gymControlsErr: payload, globalGyms: null }
        case GLOBAL_GYMS_SUCCESS: return { ...state, gymControlsErr: null, globalGyms: payload }
        case SEARCH_GLOBAL_GYMS: return {
            ...state,
            searchedGlobalGyms: searchGym(state?.globalGyms, payload),
            isSearching: payload?.gymName?.length > 0 || !!payload?.gymCity || false,
        }
        
        case GET_GYM_STAFF_ERROR: return { ...state, gymControlsErr: payload, gymStaff: null, gymName: null }
        case GET_GYM_STAFF_SUCCESS: return { 
            ...state, gymControlsErr: null, gymStaff: payload.staff, gymName: payload.gymName 
        }

        case SEARCH_GYM_STAFF_MANAGERS: return {
            ...state,
            gymManagersSearching: payload?.staffUsername?.length > 0 || false,
            searchedGymManagers: searchGymStaff(state?.gymStaff?.managers, payload),
        }

        case SEARCH_GYM_STAFF_COACHES: return {
            ...state,
            gymCoachesSearching: payload?.staffUsername?.length > 0 || false,
            searchedGymCoaches: searchGymStaff(state?.gymStaff?.coaches, payload),
        }

        case SEARCH_GYM_STAFF_ATHLETES: return {
            ...state,
            gymAthletesSearching: payload?.staffUsername?.length > 0 || false,
            searchedGymAthletes: searchGymStaff(state?.gymStaff?.athletes, payload),
        }

        case GET_GYM_FOR_EDIT_ERROR: return { ...state, gymControlsErr: payload, gymForEdit: null }
        case GET_GYM_FOR_EDIT_SUCCESS: return { ...state, gymControlsErr: null, gymForEdit: payload }

        case GET_ADMIN_GYMS_ERROR: return { ...state, gymControlsErr: payload, adminGyms: null, adminUsername: null }
        case GET_ADMIN_GYMS_SUCCESS: return { 
            ...state, gymControlsErr: null, adminGyms: payload.gyms, adminUsername: payload.adminUsername 
        }
        
        case SEARCH_ADMIN_GYMS: return {
            ...state,
            searchedAdminGyms: searchGym(state?.adminGyms, payload),
            isSearching: payload?.gymName?.length > 0 || !!payload?.gymCity || false,
        }
        
        case DELETE_GYM_SUCCESS: return { ...state, deleteGymSuccess: true }
        case DELETE_GYM_DISABLE_SUCCESS: return { ...state, deleteGymSuccess: false }

        default: return state
    }
}
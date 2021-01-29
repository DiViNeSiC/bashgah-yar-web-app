import { useContext, useEffect, useState } from "react"
import { ATHLETE_ROLE } from "../../../Constants/roles"
import { useParams } from "react-router-dom"
import { GlobalContext } from '../../../Context/provider'
import userRoleText from '../../../Utils/setUserRoleText'
import { toasterWarning } from "../../../Context/GlobalStates/actions"
import { ATHLETE_SESSION_NUMBER_ERROR } from "../../../Constants/responseMessages"
import { 
    getAllGymAdmins, deleteGymStaffById,
    searchUsers, getUserById, getGymAthletes,
    deleteUserSuccessDisable, getGymCoachesAndAthletes,
    markAthleteSession, editAthleteSession, changeUserBanState,
} from '../../../Context/UserControls/actions'

export default () => {
    const { userId } = useParams()
    const [searchType, setSearchType] = useState()
    const [athleteSessionNumber, setAthleteSessionNumber] = useState()
    const [searchQueries, setSearchQueries] = useState({ name: '', lastname: '', username: '', role: '' })
    const { history, globalDispatch, userControlsDispatch, authState: { user }, userControlsState: { 
        gymAdmins, gymCoaches, isSearching, gymAthletes, selectedUser, userControlsErr,
        searchedGymAdmins, searchedGymCoaches, searchedGymAthletes, successfulUserDelete,
    }} = useContext(GlobalContext)

    const searchQueryOnChange = (type) => ({ target: { name, value }}) => {
        setSearchType(type)
        setSearchQueries({ ...searchQueries, [name]: value }) 
    }

    const athleteSessionOnChange = ({ target: { value }}) => {
        if (value < 0) return toasterWarning(ATHLETE_SESSION_NUMBER_ERROR)(globalDispatch)
        setAthleteSessionNumber(value)
    }

    const setAthleteSessions = () => {
        if (user && user.role === ATHLETE_ROLE) {
            setAthleteSessionNumber(user.sessionsRemaining)
        }
    }
    
    const handleSearches = () => {
        if (!searchType) return
        searchUsers(searchType, searchQueries)(userControlsDispatch)
    }

    const onGetAllGymAdmins = () => {
        if (!user) return
        handleGetAllGymAdmins()
    }

    const handleGetAllGymAdmins = async () => {
        await getAllGymAdmins(userControlsDispatch, globalDispatch, history)
    }

    const onGetGymCoachesAndAthletes = () => {
        if (!user) return
        handleGetGymCoachesAndAthletes()
    }

    const handleGetGymCoachesAndAthletes = async () => {
        await getGymCoachesAndAthletes(userControlsDispatch, globalDispatch, history)
    }

    const onGetGymAthletes = () => {
        if (!user) return
        handleGetGymAthletes()
    }

    const handleGetGymAthletes = async () => {
        await getGymAthletes(userControlsDispatch, globalDispatch, history)
    }

    const onGetUserById = () => {
        if (!user || !userId) return
        handleGetUserById()
    }

    const handleGetUserById = async () => {
        await getUserById(userId)(userControlsDispatch, globalDispatch, history)
    }

    const handleChangeBanState = async (userId, banState) => {
        if (!user || !userId) return
        await changeUserBanState(userId, banState)(globalDispatch, history) 
    }

    const handleMarkGymSession = async (userId) => {
        if (!user || !userId) return
        await markAthleteSession(userId)(globalDispatch, history)
    }

    const handleEditSessionNumber = async (userId) => {
        if (!user || !userId) return
        await editAthleteSession(userId, athleteSessionNumber)(globalDispatch, history)
    }

    const onDeleteStaffById = async (userId) => {
        if (!user || !userId) return
        await deleteGymStaffById(userId)(userControlsDispatch, globalDispatch, history)
    }

    const redirectAfterDelete = () => {
        if (!successfulUserDelete) return
        deleteUserSuccessDisable(userControlsDispatch)
        history.push('/dashboard')
    }

    useEffect(handleSearches, [searchQueries, searchType])
    return {
        gymAthletes, isSearching, userRoleText,
        searchedGymAdmins, searchedGymCoaches, searchedGymAthletes, 
        handleChangeBanState, selectedUser, onGetUserById, userControlsErr,
        athleteSessionOnChange, user, gymAdmins, onGetGymCoachesAndAthletes,
        athleteSessionNumber, handleEditSessionNumber, handleMarkGymSession,  
        redirectAfterDelete, searchQueryOnChange, successfulUserDelete, gymCoaches,
        onGetGymAthletes, onGetAllGymAdmins, onDeleteStaffById, setAthleteSessions,
    }
}
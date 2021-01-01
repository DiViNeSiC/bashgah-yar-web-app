import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GlobalContext } from '../../../Context/provider'
import userRoleText from '../../../Utils/setUserRoleText'
import { 
    getAllGymAdmins, deleteGymStaffById,
    searchUsers, getUserById, getGymAthletes,
    deleteUserSuccessDisable, getGymCoachesAndAthletes,
} from '../../../Context/UserControls/actions'

export default () => {
    const history = useHistory()
    const { userId } = useParams()
    const [searchType, setSearchType] = useState()
    const [searchQueries, setSearchQueries] = useState({ name: '', lastname: '', username: '', role: '' })
    const { globalDispatch, userControlsDispatch, authState: { user }, userControlsState: { 
        gymAdmins, gymCoaches,
        isSearching, gymAthletes,
        selectedUser, userControlsErr, 
        searchedGymAdmins, searchedGymCoaches,
        searchedGymAthletes, successfulUserDelete,
    }} = useContext(GlobalContext)


    const searchQueryOnChange = (type) => ({ target: { name, value }}) => {
        setSearchType(type)
        setSearchQueries({ ...searchQueries, [name]: value }) 
    }
    
    const handleSearches = () => {
        if (!searchType) return
        searchUsers(searchType, searchQueries)(userControlsDispatch)
    }

    const onGetAllGymAdmins = () => { if (!user) return; handleGetAllGymAdmins() }

    const handleGetAllGymAdmins = async () => { await getAllGymAdmins(userControlsDispatch, globalDispatch) }

    const onGetGymCoachesAndAthletes = () => { if (!user) return; handleGetGymCoachesAndAthletes() }

    const handleGetGymCoachesAndAthletes = async () => { await getGymCoachesAndAthletes(userControlsDispatch, globalDispatch) }

    const onGetGymAthletes = () => { if (!user) return; handleGetGymAthletes() }

    const handleGetGymAthletes = async () => { await getGymAthletes(userControlsDispatch, globalDispatch) }

    const onGetUserById = () => { if (!user || !userId) return; handleGetUserById() }

    const handleGetUserById = async () => { await getUserById(userId)(userControlsDispatch, globalDispatch) }

    const onDeleteStaffById = (userId) => async () => {
        if (!user || !userId) return
        await deleteGymStaffById(userId)(userControlsDispatch, globalDispatch)
    }

    const redirectAfterDelete = () => {
        if (!successfulUserDelete) return
        deleteUserSuccessDisable(userControlsDispatch)
        history.push('/dashboard')
    }

    useEffect(handleSearches, [searchQueries, searchType])
    return {
        gymAthletes, isSearching, userRoleText,
        user, gymAdmins, onGetGymCoachesAndAthletes,
        selectedUser, onGetUserById, userControlsErr,
        onGetGymAthletes, onGetAllGymAdmins, onDeleteStaffById,
        searchedGymAdmins, searchedGymCoaches, searchedGymAthletes,
        redirectAfterDelete, searchQueryOnChange, successfulUserDelete, gymCoaches,
    }
}
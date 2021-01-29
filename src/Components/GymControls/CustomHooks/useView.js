import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../../Context/provider"
import { searchGyms, getGlobalGyms, getGymById, getGymStaff, getAdminGyms, changeGymBanState } from '../../../Context/GymControls/actions'

export default () => {
    const { gymId, adminId } = useParams()
    const [searchType, setSearchType] = useState()
    const [searchQueries, setSearchQueries] = useState({ staffUsername: '', gymName: '', gymCity: '' })
    const { history, globalDispatch, gymControlsDispatch, gymControlsState: {
        searchedAdminGyms, oneGym, gymName, gymStaff, adminGyms,
        searchedGymCoaches, searchedGymManagers, searchedGymAthletes,
        gymCoachesSearching, gymManagersSearching, gymAthletesSearching,
        searchedGlobalGyms, globalGyms, isSearching, adminUsername, gymControlsErr,
    }} = useContext(GlobalContext)

    const searchQueryOnChange = (type) => ({ target: { name, value }}) => {
        setSearchType(type)
        setSearchQueries({ ...searchQueries, [name]: value }) 
    }
    
    const handleSearches = () => {
        if (!searchType) return
        searchGyms(searchType, searchQueries)(gymControlsDispatch)
    }

    const onGetGlobalGyms = () => { handleGetGlobalGyms() }

    const handleGetGlobalGyms = async () => {
        await getGlobalGyms(gymControlsDispatch, globalDispatch, history)
    }

    const onGetAdminGyms = () => {
        if (!adminId) return
        handleGetAdminGyms()
    }

    const handleGetAdminGyms = async () => {
        await getAdminGyms(adminId)(gymControlsDispatch, globalDispatch, history)
    }

    const onGetGymStaff = () => {
        if (!gymId) return
        handleGetGymStaff()
    }

    const handleGetGymStaff = async () => {
        await getGymStaff(gymId)(gymControlsDispatch, globalDispatch, history)
    }

    const onGetGymById = () => {
        if (!gymId) return
        handleGetGymById()
    }

    const handleGetGymById = async () => {
        await getGymById(gymId)(gymControlsDispatch, globalDispatch, history)
    }

    const handleBanState = async (gymId, banState) => {
        if (gymId || oneGym) return
        await changeGymBanState(gymId, banState)(globalDispatch, history)
    }

    useEffect(handleSearches, [searchQueries, searchType])
    return { 
        onGetAdminGyms, gymControlsErr, searchedAdminGyms,
        searchedGlobalGyms, searchQueryOnChange, isSearching,
        onGetGymById, onGetGymStaff, adminUsername, onGetGlobalGyms,
        searchedGymCoaches, searchedGymManagers, searchedGymAthletes,
        gymCoachesSearching, gymManagersSearching, gymAthletesSearching,
        oneGym, gymName, adminGyms, globalGyms, gymStaff, handleBanState,
    }
}
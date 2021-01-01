import React, { useEffect } from 'react'
import useView from '../CustomHooks/useView'
import MultiGymView from '../../../Layout/GymControls/multiGymView'
import { SEARCH_GLOBAL_GYMS } from '../../../Constants/Actions/gymControls'

export default () => {
    const { 
        globalGyms, gymControlsErr, searchedGlobalGyms, 
        searchQueryOnChange, isSearching, onGetGlobalGyms,
    } = useView()

    useEffect(onGetGlobalGyms, [])
    return <MultiGymView
        gyms={globalGyms}
        error={gymControlsErr}
        isSearching={isSearching}
        searchType={SEARCH_GLOBAL_GYMS}
        searchedGyms={searchedGlobalGyms}
        searchOnChange={searchQueryOnChange}
    />
}
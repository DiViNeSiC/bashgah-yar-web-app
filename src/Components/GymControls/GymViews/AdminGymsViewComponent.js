import React, { useEffect } from 'react'
import useView from '../CustomHooks/useView'
import MultiGymView from '../../../Layout/GymControls/multiGymView'
import { SEARCH_ADMIN_GYMS } from '../../../Constants/Actions/gymControls'

export default () => {
    const {
        onGetAdminGyms, gymControlsErr, searchedAdminGyms,
        searchQueryOnChange, isSearching, adminGyms, adminUsername,
    } = useView()

    useEffect(onGetAdminGyms, [])
    return <MultiGymView
        gyms={adminGyms}
        error={gymControlsErr}
        isSearching={isSearching}
        adminUsername={adminUsername}
        searchType={SEARCH_ADMIN_GYMS}
        searchedGyms={searchedAdminGyms}
        searchOnChange={searchQueryOnChange}
    />
}

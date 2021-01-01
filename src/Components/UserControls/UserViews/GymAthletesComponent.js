import React, { useEffect } from 'react'
import useControls from '../CustomHooks/useControl'
import MultiUserView from '../../../Layout/UserControls/multiUserView'
import { SEARCH_ATHLETES } from '../../../Constants/Actions/userControls'

export default () => {
    const { 
        onGetGymAthletes, searchedGymAthletes, searchQueryOnChange,
        gymAthletes, isSearching, userRoleText, user, userControlsErr,
    } = useControls()

    useEffect(onGetGymAthletes, [user])
    return <MultiUserView
        users={gymAthletes}
        error={userControlsErr}
        isSearching={isSearching}
        searchType={SEARCH_ATHLETES}
        searchedUsers={searchedGymAthletes}
        searchOnChange={searchQueryOnChange}
        userRoleText={userRoleText}
    />
}

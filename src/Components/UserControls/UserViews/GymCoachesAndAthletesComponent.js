import React, { useEffect } from 'react'
import useControls from '../CustomHooks/useControl'
import MultiUserView from '../../../Layout/UserControls/multiUserView'
import { SEARCH_COACHES_AND_ATHLETES } from '../../../Constants/Actions/userControls'

export default () => {
    const { 
        searchQueryOnChange, searchedGymCoaches, gymAthletes, isSearching, userRoleText,
        user, onGetGymCoachesAndAthletes, userControlsErr, searchedGymAthletes, gymCoaches,
    } = useControls()

    useEffect(onGetGymCoachesAndAthletes, [user])
    return <MultiUserView
        error={userControlsErr}
        isSearching={isSearching}
        userRoleText={userRoleText}
        searchOnChange={searchQueryOnChange}
        users={gymAthletes?.concat(gymCoaches)}
        searchType={SEARCH_COACHES_AND_ATHLETES}
        searchedUsers={searchedGymAthletes?.concat(searchedGymCoaches)}
    />
}
import React, { useEffect } from 'react'
import useControls from '../CustomHooks/useControl'
import MultiUserView from '../../../Layout/UserControls/multiUserView'
import { SEARCH_GYM_ADMINS } from '../../../Constants/Actions/userControls'

export default () => {
    const { 
        isSearching, searchedGymAdmins, searchQueryOnChange,
        userRoleText, user, gymAdmins, userControlsErr, onGetAllGymAdmins, 
    } = useControls()

    useEffect(onGetAllGymAdmins, [user])
    return <MultiUserView
        users={gymAdmins}
        error={userControlsErr}
        isSearching={isSearching}
        searchType={SEARCH_GYM_ADMINS}
        searchedUsers={searchedGymAdmins}
        searchOnChange={searchQueryOnChange}
        userRoleText={userRoleText}
    />
}

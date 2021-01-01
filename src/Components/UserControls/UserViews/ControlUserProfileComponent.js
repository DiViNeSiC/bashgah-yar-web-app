import React, { useEffect } from 'react'
import useControls from '../CustomHooks/useControl'
import SingleUserView from '../../../Layout/UserControls/singleUserView'

export default () => {
    const { 
        redirectAfterDelete, successfulUserDelete, onDeleteStaffById,
        userRoleText, user, selectedUser, onGetUserById, userControlsErr,
    } = useControls()

    useEffect(onGetUserById, [user])
    useEffect(redirectAfterDelete, [successfulUserDelete])
    return <SingleUserView
        loggedUser={user}
        userRoleText={userRoleText}
        selectedUser={selectedUser}
        userControlsErr={userControlsErr}
        onDeleteStaffById={onDeleteStaffById}
    />
}

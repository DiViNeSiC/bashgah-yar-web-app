import React, { useContext, useState } from 'react'
import isAuth from '../../Utils/isAuth'
import { useLocation } from 'react-router-dom'
import { GlobalContext } from '../../Context/provider'
import NavbarLayout from '../../Layout/Global/navbar'
import useGlobalRequests from './CustomHooks/useGlobalRequests'
import { ATHLETE_ROLE, GYM_ADMIN_ROLE, GYM_COACH_ROLE, GYM_MANAGER_ROLE, SITE_ADMIN_ROLE } from '../../Constants/roles'

export default () => {
    const { pathname } = useLocation()
    const [sideBarShow, setSideBarShow] = useState(false)
    const { onActiveAccountRequest, onLogout } = useGlobalRequests()
    const onSideBarClick = () => { setSideBarShow(prevState => !prevState) }
    const { authState: { user, logoutLoading } } = useContext(GlobalContext)

    return <NavbarLayout 
        isAuth={isAuth()}
        loggedUser={user}
        onLogout={onLogout}
        pathname={pathname}
        sideBarShow={sideBarShow}
        logoutLoading={logoutLoading}
        onSideBarClick={onSideBarClick}
        userIsAthlete={user?.role === ATHLETE_ROLE}
        userIsGymAdmin={user?.role === GYM_ADMIN_ROLE}
        userIsGymCoach={user?.role === GYM_COACH_ROLE}
        onActiveAccountRequest={onActiveAccountRequest}
        userIsSiteAdmin={user?.role === SITE_ADMIN_ROLE}
        userIsGymManager={user?.role === GYM_MANAGER_ROLE}
    />
}
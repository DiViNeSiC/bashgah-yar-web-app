import React from 'react'
import isAuth from '../Utils/isAuth'
import { NA_ROUTE } from '../Constants/routeInfos'
import { Route, useHistory } from 'react-router-dom'
import useProfile from '../Components/Global/CustomHooks/useProfile'
import useCheckRoute from '../Components/Global/CustomHooks/useCheckRoute'

export default (route) => {
    const { path, title, isProtected } = route
    const history = useHistory()
    document.title = title

    if (isProtected && !isAuth() && isProtected !== NA_ROUTE) history.push('/login')
    if (!isProtected && isAuth() && isProtected !== NA_ROUTE) history.push('/dashboard')

    useProfile()
    useCheckRoute(path)
    return (
        <Route
            path={path}
            exact
            render={(props) => <route.component {...props} />}
        />
    )
}
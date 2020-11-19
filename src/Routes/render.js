import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import isAuth from '../Utils/isAuth'
import useProfile from '../Components/GlobalComponents/CustomHooks/useProfile'

export default (route) => {
    const { path, title, isProtected } = route
    const history = useHistory()
    document.title = title

    if (isProtected && !isAuth()) history.push('/login')
    if (!isProtected && isAuth()) history.push('/dashboard')

    useProfile()
    return (
        <Route
            path={path}
            exact
            render={(props) => <route.component {...props} />}
        />
    )
}
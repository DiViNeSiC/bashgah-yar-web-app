import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../Context/provider'
import { authRoutes, notAuthRoutes } from '../../../Constants/navRoutes'
import isAuth from '../../../Utils/isAuth'
import { useHistory } from 'react-router-dom'

export default (path) => {
    const history = useHistory()
    const { authState: { user } } = useContext(GlobalContext)

    const handleMatchRoutes = () => {
        if (!isAuth()) {
            const route = notAuthRoutes.find(route => route.path === path)
            if (!route) return history.push('/login')
            if (route) return
        }
        if (!user) return
        const { routes } = authRoutes.find(routes => routes.role === user.role)
        const selectedRoute = routes.find(route => route.path === path)
        if (!selectedRoute) return history.push('/dashboard')
    }

    useEffect(handleMatchRoutes, [user, path])
}
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../Context/provider'
import { authRoutes, notAuthRoutes } from '../../../Constants/navRoutes'
import isAuth from '../../../Utils/isAuth'

export default () => {
    const { authState: { user } } = useContext(GlobalContext)
    const [routes, setRoutes] = useState([])

    const handleMatchRoutes = () => {
        if (!isAuth()) return setRoutes(notAuthRoutes)
        if (!user) return
        const { routes } = authRoutes.find(routes => routes.role === user.role)
        setRoutes(routes)
    }

    useEffect(handleMatchRoutes, [user])
    return routes
}